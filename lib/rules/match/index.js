'use strict';
const path = require('path');
const { casesNames } = require('./constants');
const { parseOptions } = require('./parseOptions');

/**
 * @param {RuleContext} context
 */
function create(context) {
  const { match, ignore } = parseOptions(context.options);

  return {
    Program(node) {
      const cwd = path.resolve(context.getCwd());
      const filePath = context.getFilename();

      const absolutePath = path.resolve(filePath);
      const relativePath = path.relative(cwd, absolutePath);
      const parsed = path.parse(relativePath);
      parsed.ext = parsed.ext.slice(1);

      if (
        ignore.some((regex) => regex.test(parsed.base)) ||
        ignore.some((regex) => regex.test(relativePath))
      ) {
        return;
      }

      parsed.dir.split(path.sep).forEach((directory) => {
        if (!directory) {
          return;
        }

        const matchesRegex = match.some((regex) => regex.test(directory));
        if (!matchesRegex) {
          context.report({
            node,
            message:
              "Folder name '{{name}}' in path '{{path}}' does not match the naming convention",
            data: {
              name: directory,
              path: relativePath,
            },
          });
        }
      });

      const fileMatchesRegex = match.some((regex) => regex.test(parsed.name));
      if (!fileMatchesRegex) {
        context.report({
          node,
          message:
            "File name '{{name}}' in path '{{path}}' does not match the naming convention",
          data: {
            name: parsed.base,
            path: relativePath,
          },
        });
      }

      if (parsed.ext !== parsed.ext.toLocaleLowerCase()) {
        context.report({
          node,
          message:
            "File extension '{{ext}}' in path '{{path}}' is not in lower case",
          data: {
            ext: parsed.ext,
            path: relativePath,
          },
        });
      }
    },
  };
}

const casesMatchOption = {
  type: 'string',
  enum: [...casesNames],
};

const regexMatchOption = {
  type: 'string',
  format: 'regex',
  description: 'Regex value',
};

const schema = [
  {
    oneOf: [
      casesMatchOption,
      {
        type: 'array',
        uniqueItems: true,
        items: casesMatchOption,
      },
      {
        type: 'object',
        properties: {
          match: {
            type: 'array',
            uniqueItems: true,
            items: casesMatchOption,
          },
          ignore: {
            type: 'array',
            uniqueItems: true,
            items: regexMatchOption,
          },
          defaultIgnore: {
            type: 'boolean',
            defaultValue: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },
];

/**
 * @type {RuleModule}
 */
module.exports = {
  create,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Eslint rule for consistent file and folder names',
    },
    schema,
  },
};
