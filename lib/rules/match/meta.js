const { casesNames } = require('./constants');

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
        minItems: 1,
        uniqueItems: true,
        items: casesMatchOption,
      },
      {
        type: 'object',
        properties: {
          match: {
            type: 'array',
            minItems: 1,
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
          },
          validateFolders: {
            type: 'boolean',
          },
          validateExtensions: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },
];

const meta = {
  type: 'suggestion',
  docs: {
    description: 'Eslint rule for consistent file and folder names',
  },
  schema,
};

module.exports = {
  meta,
};
