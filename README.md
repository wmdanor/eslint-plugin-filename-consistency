[![npm version](https://img.shields.io/npm/v/eslint-plugin-filename-consistency.svg)](https://www.npmjs.com/package/eslint-plugin-filename-consistency)
[![Downloads](https://img.shields.io/npm/dm/eslint-plugin-filename-consistency.svg)](https://www.npmjs.com/package/eslint-plugin-filename-consistency)
[![Build Status](https://github.com/wmdanor/eslint-plugin-filename-consistency/workflows/CI/badge.svg)](https://github.com/wmdanor/eslint-plugin-filename-consistency/actions)

# eslint-plugin-filename-consistency

## Enabling the plugin

Modify your `.eslintrc` file to load the plugin and enable the rules you want to use.

```json
{
  "plugins": [
    "filename-consistency"
  ],
  "rules": {
    "filename-consistency/match": "error"
  }
}
```

## Rules

### Consistent files and folders names (`match`)

A rule to enforce a certain file and folder naming convention.

The convention can be configured using the name of case (the default is `camel`).

Read more about this rule [here](docs/rules/match.md)
