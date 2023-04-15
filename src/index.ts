import { ESLint } from 'eslint';
import matchRuleModule from './rules/match';

// TODO: split functions to separate files
const plugin: ESLint.Plugin = {
  rules: {
    match: matchRuleModule,
  },
};

export = plugin;
