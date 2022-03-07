const { RuleTester } = require('eslint');
const rule = require('./index');

const ruleTester = new RuleTester();

function testCase(filename) {
  return {
    code: 'var foo = 0;',
    filename,
  };
}

const valid = [testCase('fooBar.js'), testCase('foobar.js')];

const invalid = [];

ruleTester.run('match', rule, { valid, invalid });
