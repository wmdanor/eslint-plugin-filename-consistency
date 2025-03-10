const { RuleTester } = require("eslint");
const rule = require("./index");
const { describe, it } = require("node:test");

/**
 * @type {import('eslint').RuleTester.ValidTestCase[]}
 */
const valid = [
  // camelCase
  testCase("camelCase/camelCase.js", ["camel"]),
  testCase("camelCase/camelcase.js", ["camel"]),
  testCase("camelCase/camelCase.test.js", ["camel"]),
  testCase("camelCase/camelCase.camelCase.js", ["camel"]),
  testCase("camelCase/index.js", ["camel"]),
  testCase("camelCase/index.test.js", ["camel"]),
  // PascalCase
  testCase("PascalCase/PascalCase.js", ["pascal"]),
  testCase("PascalCase/PascalCase.test.js", ["pascal"]),
  testCase("PascalCase/PascalCase.PascalCase.js", ["pascal"]),
  testCase("PascalCase/index.js", ["pascal"]),
  testCase("PascalCase/index.test.js", ["pascal"]),
  // snake_case
  testCase("snake_case/snake_case.js", ["snake"]),
  testCase("snake_case/snake_case.test.js", ["snake"]),
  testCase("snake_case/snake_case.snake_case.js", ["snake"]),
  testCase("snake_case/index.js", ["snake"]),
  testCase("snake_case/index.test.js", ["snake"]),
  // kebab-case
  testCase("kebab-case/kebab-case.js", ["kebab"]),
  testCase("kebab-case/kebab-case.test.js", ["kebab"]),
  testCase("kebab-case/kebab-case.kebab-case.js", ["kebab"]),
  testCase("kebab-case/index.js", ["kebab"]),
  testCase("kebab-case/index.test.js", ["kebab"]),
  // default ignore
  testCase("defaultIgnore/Dockerfile", ["camel"]),
  testCase("defaultIgnore/LICENSE", ["camel"]),
  testCase("defaultIgnore/CONTRIBUTING", ["camel"]),
  testCase("defaultIgnore/CODE_OF_CONDUCT", ["camel"]),
  testCase("defaultIgnore/README.md", ["camel"]),
  // custom
  testCase("IGNORED_ALL/ANOTHER_SEGMENT.js", [
    {
      match: ["camel"],
      ignore: ["IGNORED_ALL"],
    },
  ]),
  testCase("IGNORED_SEGMENT/camelCase.js", [
    {
      match: ["camel"],
      ignoreSegments: ["IGNORED_SEGMENT"],
    },
  ]),
  testCase("NotCamelCase/dontValidateFolders.js", [
    {
      match: ["camel"],
      validateFolders: false,
    },
  ]),
  testCase("camelCase/dontValidateExt.JS", [
    {
      match: ["camel"],
      validateExtensions: false,
    },
  ]),
];

/**
 * @type {import('eslint').RuleTester.InvalidTestCase[]}
 */
const invalid = [
  // camelCase
  invalidTestCase("NotCamelCase/NotCamelCase.js", 2, ["camel"]),
  invalidTestCase("not_camel_case/not_camel_case.js", 2, ["camel"]),
  invalidTestCase("not-camel-case/not-camel-case.js", 2, ["camel"]),
  // PascalCase
  invalidTestCase("notPascalCase/notPascalCase.js", 2, ["pascal"]),
  invalidTestCase("not_pascal_case/not_pascal_case.js", 2, ["pascal"]),
  invalidTestCase("not-pascal-case/not-pascal-case.js", 2, ["pascal"]),
  // snake_case
  invalidTestCase("notSnakeCase/notSnakeCase.js", 2, ["snake"]),
  invalidTestCase("NotSnakeCase/NotSnakeCase.js", 2, ["snake"]),
  invalidTestCase("not-snake-case/not-snake-case.js", 2, ["snake"]),
  // kebab-case
  invalidTestCase("notKebabCase/notKebabCase.js", 2, ["kebab"]),
  invalidTestCase("NotKebabCase/NotKebabCase.js", 2, ["kebab"]),
  invalidTestCase("not_kebab_case/not_kebab_case.js", 2, ["kebab"]),
  // invalid ext
  invalidTestCase("camelCase/invalidExt.JS", 1, ["camel"]),
  // custom
  invalidTestCase("defaultIgnoreDisabled/Dockerfile", 1, [
    {
      match: ["camel"],
      defaultIgnore: false,
    },
  ]),
  invalidTestCase("defaultIgnoreDisabled/LICENSE", 1, [
    {
      match: ["camel"],
      defaultIgnore: false,
    },
  ]),
  invalidTestCase("defaultIgnoreDisabled/CONTRIBUTING", 1, [
    {
      match: ["camel"],
      defaultIgnore: false,
    },
  ]),
  invalidTestCase("defaultIgnoreDisabled/CODE_OF_CONDUCT", 1, [
    {
      match: ["camel"],
      defaultIgnore: false,
    },
  ]),
  invalidTestCase("defaultIgnoreDisabled/README.md", 1, [
    {
      match: ["camel"],
      defaultIgnore: false,
    },
  ]),
];

describe("RULE match", () => {
  const ruleTester = new RuleTester();

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

/**
 * @param {string} filename
 * @param {any} [options]
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
 * @param {string} filename
 * @param {number | Array<import('eslint').RuleTester.TestCaseError | string>} [errors=1]
 * @param {any} [options]
 * @returns {import('eslint').RuleTester.InvalidTestCase}
 */
function invalidTestCase(filename, errors = 1, options = undefined) {
  /**
   * @type {import('eslint').RuleTester.InvalidTestCase}
   */
  const testCase = {
    code: "var foo = 0;",
    filename,
    errors,
  };

  if (options) {
    testCase.options = options;
  }

  return testCase;
}
