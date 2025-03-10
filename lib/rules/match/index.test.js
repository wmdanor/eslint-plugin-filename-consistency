const { RuleTester } = require("eslint");
const rule = require("./index");
const { describe, it } = require("node:test");

const ruleTester = new RuleTester();

/**
 * @param {string} filename
 * @param {any} options
 * @returns {import('eslint').RuleTester.ValidTestCase}
 */
function testCase(filename, options = undefined) {
  /**
   * @type {import('eslint').RuleTester.ValidTestCase}
   */
  const testCase = {
    code: "var foo = 0;",
    filename,
  };

  if (options) {
    testCase.options = options;
  }

  return testCase;
}

/**
 * @type {import('eslint').RuleTester.ValidTestCase[]}
 */
const valid = [testCase("fooBar.js"), testCase("foobar.js")];

/**
 * @type {import('eslint').RuleTester.InvalidTestCase[]}
 */
const invalid = [
  {
    ...testCase("foo_bar.js"),
    errors: 1,
  },
];

describe("RULE match", () => {
  describe("valid test cases", () => {
    for (const testCase of valid) {
      const testName = `should pass for "${testCase.filename}"`;

      it(testName, () => {
        ruleTester.run("match", rule, { valid: [testCase], invalid: [] });
      });
    }
  });

  describe("invalid test cases", () => {
    for (const testCase of invalid) {
      const testName = `should fail for "${testCase.filename}"`;

      it(testName, () => {
        ruleTester.run("match", rule, { valid: [], invalid: [testCase] });
      });
    }
  });
});

// ruleTester.run("match", rule, { valid, invalid });
