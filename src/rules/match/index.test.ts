import { RuleTester } from 'eslint';
import rule from './index';

const ruleTester = new RuleTester();

function testCase(filename: string) {
  return {
    code: `var filename = '${filename}'`,
    filename,
  };
}

const valid: RuleTester.ValidTestCase[] = [
  testCase('fooBar.js'),
  testCase('foobar.js'),
];

const invalid: RuleTester.InvalidTestCase[] = [];

ruleTester.run('match', rule, { valid, invalid });
