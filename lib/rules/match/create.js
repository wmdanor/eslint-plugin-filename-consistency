'use strict';

const { parseOptions } = require('./parseOptions');
const path = require('path');

/**
 * @param {RuleContext} context
 */
function create(context) {
  const options = parseOptions(context.options);
  const errors = [];

  return {
    Program(node) {
      const parsed = getParsedPath(context);

      if (
        options.ignore.some((regex) => regex.test(parsed.base)) ||
        options.ignore.some((regex) => regex.test(parsed.path))
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

/**
 * @param {ParsedOptions} options
 * @param {MyParsedPath} parsedPath
 * @return {ValidationError[]}
 */
function validateFolders(options, parsedPath) {
  const errors = [];
  const { match } = options;

  parsedPath.dir.split(path.sep).forEach((directory) => {
    if (!directory) {
      return;
    }

    const matchesRegex = match.some((regex) => regex.test(directory));
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

/**
 * @param {ParsedOptions} options
 * @param {MyParsedPath} parsedPath
 * @return {ValidationError[]}
 */
function validateFilename(options, parsedPath) {
  const { match } = options;

  const fileMatchesRegex = match.some((regex) => regex.test(parsedPath.name));
  const errors = [];

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

/**
 * @param {MyParsedPath} parsedPath
 * @return {ValidationError[]}
 */
function validateExtension(parsedPath) {
  const errors = [];

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

/**
 * @param {RuleContext} context
 * @return {MyParsedPath}
 */
function getParsedPath(context) {
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
