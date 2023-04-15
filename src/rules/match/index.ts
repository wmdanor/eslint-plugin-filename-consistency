import { Rule } from 'eslint';
import create from './create';
import meta from './meta';

const ruleModule: Readonly<Rule.RuleModule> = {
  create,
  meta,
};

export default ruleModule;
