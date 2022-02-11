'use strict';

const path = require('path');

const cases = {
  camel: /^[a-z][a-zA-Z0-9]+$/,
  snake: /^([a-z][a-z0-9]*)(_[a-z0-9]+)*$/,
  kebab: /^([a-z][a-z0-9]*)([-.][a-z0-9]+)*$/,
  pascal: /^[A-Z][a-zA-Z0-9]+$/,
};
const casesNames = Object.keys(cases);

/**
 * @param {import('eslint').Rule.RuleContext} context
 */
function create(context) {
  const { match, ignore } = parseOptions(context.options);

  return {
    Program: function (node) {
      const filePath = context.getFilename();

      const absolutePath = path.resolve(filePath);
      const parsed = path.parse(absolutePath);
      const cwd = path.resolve(context.getCwd());

      const relativePath = path.relative(cwd, parsed.dir);

      if (
        ignore.some((regex) => regex.test(parsed.base)) ||
        ignore.some((regex) => regex.test(relativePath))
      ) {
        return;
      }

      relativePath.split(path.sep).forEach((directory) => {
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
    },
  };
}

/**
 *
 * @param options {Array}
 * @return {{match: RegExp[], ignore: RegExp[]}}
 */
function parseOptions(options) {
  const defaultRegexp = cases.camel;

  const match = [];
  const ignore = [];

  const [matchOption] = options;

  if (!matchOption) {
    match.push(defaultRegexp);
  } else if (typeof matchOption === 'string') {
    const regex = getMatchRegex(matchOption);
    match.push(regex);
  } else {
    for (const str of matchOption.matches ?? []) {
      const regex = getMatchRegex(str);
      match.push(regex);
    }

    for (const str of matchOption.ignore ?? []) {
      const regex = getMatchRegex(str);
      ignore.push(regex);
    }
  }

  return {
    match,
    ignore,
  };
}

/**
 *
 * @param match {string | RegExp}
 * @return {RegExp}
 */
function getMatchRegex(match) {
  return cases[match] ?? new RegExp(match);
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

// const matchOption = {
//   anyOf: [
//     casesMatchOption,
//     regexMatchOption
//   ]
// };

const schema = [
  {
    oneOf: [
      casesMatchOption,
      {
        type: 'object',
        properties: {
          matches: {
            type: 'array',
            uniqueItems: true,
            items: casesMatchOption,
          },
          ignore: {
            type: 'array',
            uniqueItems: true,
            items: regexMatchOption,
          },
        },
        additionalProperties: false,
      },
    ],
  },
];

/**
 * @type {import('eslint').Rule.RuleModule}
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
