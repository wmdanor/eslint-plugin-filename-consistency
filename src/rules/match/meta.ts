import { Rule } from 'eslint';
import { RuleMetaDataSchema } from '../../types';
import { casesNames } from './constants';

const casesMatchOption: RuleMetaDataSchema = {
  type: 'string',
  enum: [...casesNames],
};

const regexMatchOption: RuleMetaDataSchema = {
  type: 'string',
  format: 'regex',
  description: 'Regex value',
};

const schema: RuleMetaDataSchema = [
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

const meta: Readonly<Rule.RuleMetaData> = {
  type: 'suggestion',
  docs: {
    description: 'Eslint rule for consistent file and folder names',
    url: 'https://github.com/wmdanor-universe/eslint-plugin-filename-consistency/blob/master/docs/rules/match.md',
  },
  schema,
};

export default meta;
