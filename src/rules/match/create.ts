import { Rule } from 'eslint';
import { parseOptions } from './parseOptions';
import path, { ParsedPath } from 'path';
import { MatchOptions, ValidationError, ParsedOptions } from './types';

export interface MatchRuleContext extends Rule.RuleContext {
  options: [MatchOptions];
}

export default function create(context: MatchRuleContext): Rule.RuleListener {
  const options = parseOptions(context.options);
  const errors: ValidationError[] = [];

  return {
    Program(node) {
      const parsed = getParsedPath(context);

      if (
        options.ignore.some(regex => regex.test(parsed.base)) ||
        options.ignore.some(regex => regex.test(parsed.path))
      ) {
        return;
      }

      if (options.validateFolders) {
        errors.push(...validateFolders(options, parsed));
      }

      errors.push(...validateFilename(options, parsed));

      if (options.validateExtensions) {
        errors.push(...validateExtension(parsed));
      }

      for (const error of errors) {
        context.report({
          ...error,
          node,
        });
      }
    },
  };
}

function validateFolders(
  options: ParsedOptions,
  parsedPath: CustomParsedPath,
): ValidationError[] {
  const errors: ValidationError[] = [];

  const { match } = options;

  parsedPath.dir.split(path.sep).forEach(directory => {
    if (!directory) {
      return;
    }

    const matchesRegex = match.some(regex => regex.test(directory));
    if (!matchesRegex) {
      errors.push({
        message:
          "Folder name '{{name}}' in path '{{path}}' does not match the naming convention",
        data: {
          name: directory,
          path: parsedPath.path,
        },
      });
    }
  });

  return errors;
}

function validateFilename(
  options: ParsedOptions,
  parsedPath: CustomParsedPath,
): ValidationError[] {
  const errors: ValidationError[] = [];

  const { match } = options;
  const fileMatchesRegex = match.some(regex => regex.test(parsedPath.name));

  if (!fileMatchesRegex) {
    errors.push({
      message:
        "File name '{{name}}' in path '{{path}}' does not match the naming convention",
      data: {
        name: parsedPath.base,
        path: parsedPath.path,
      },
    });
  }

  return errors;
}

function validateExtension(parsedPath: CustomParsedPath): ValidationError[] {
  const errors: ValidationError[] = [];

  if (parsedPath.ext !== parsedPath.ext.toLocaleLowerCase()) {
    errors.push({
      message:
        "File extension '{{ext}}' in path '{{path}}' is not in lower case",
      data: {
        ext: parsedPath.ext,
        path: parsedPath.path,
      },
    });
  }

  return errors;
}

interface CustomParsedPath extends ParsedPath {
  path: string;
}

export function getParsedPath(context: MatchRuleContext): CustomParsedPath {
  const cwd = path.resolve(context.getCwd());
  const filePath = context.getFilename();

  const absolutePath = path.resolve(filePath);
  const relativePath = path.relative(cwd, absolutePath);
  const parsed = path.parse(relativePath);

  return {
    ...parsed,
    ext: parsed.ext.slice(1),
    path: relativePath,
  };
}

module.exports = { create };
