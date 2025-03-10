"use strict";

const { describe, it } = require("node:test");
const { parseOptions } = require("./parseOptions");
const assert = require("node:assert");

const { defaultOptions, cases, casesNames } = require("./constants");

describe("parseOptions", () => {
  describe("default options", () => {
    it("should return default options if options are missing", () => {
      /**
       * @type {import("./types").Options}
       */
      const options = [];

      const parsed = parseOptions(options);

      assert.deepStrictEqual(parsed, defaultOptions);
    });
  });

  describe("string options", () => {
    const testCases = casesNames;

    for (const testCase of testCases) {
      const testName = `should return ${testCase} case variant for "${testCase}"`;

      it(testName, () => {
        /**
         * @type {import("./types").Options}
         */
        const options = [testCase];

        const parsed = parseOptions(options);

        assert.deepStrictEqual(parsed, {
          ...defaultOptions,
          match: [cases[testCase]],
        });
      });
    }
  });

  describe("array options", () => {
    /**
     * @type {import("./types").MatchOptionsCase[][]}
     */
    const testCases = [
      ["camel"],
      ["pascal", "snake"],
      ["snake"],
      ["kebab", "snake", "pascal"],
      ["pascal", "kebab", "snake", "camel"],
    ];

    for (const testCase of testCases) {
      const testName = `should return ${testCase} case variant for "${testCase}"`;

      it(testName, () => {
        /**
         * @type {import("./types").Options}
         */
        const options = [testCase];

        const parsed = parseOptions(options);

        assert.deepStrictEqual(parsed, {
          ...defaultOptions,
          match: testCase.map((c) => cases[c]),
        });
      });
    }
  });

  describe("object options", () => {
    it("should be default if empty", () => {
      /**
       * @type {import("./types").MatchOptionsObject}
       */
      const options = {};

      const parsed = parseOptions([options]);

      assert.deepStrictEqual(parsed, {
        ...defaultOptions,
      });
    });

    it("should use cases provided in match", () => {
      /**
       * @type {import("./types").MatchOptionsObject}
       */
      const options = {
        match: ["camel", "kebab"],
      };

      const parsed = parseOptions([options]);

      assert.deepStrictEqual(parsed, {
        ...defaultOptions,
        match: [cases.camel, cases.kebab],
      });
    });

    it("should use ignore patterns from ignore", () => {
      /**
       * @type {import("./types").MatchOptionsObject}
       */
      const options = {
        ignore: ["^ignoreme$"],
      };

      const parsed = parseOptions([options]);

      assert.deepStrictEqual(parsed, {
        ...defaultOptions,
        ignore: [new RegExp("^ignoreme$")],
      });
    });

    it("should use ignore segments patterns from ignore segments", () => {
      /**
       * @type {import("./types").MatchOptionsObject}
       */
      const options = {
        ignoreSegments: ["^ignoreme$"],
      };

      const parsed = parseOptions([options]);

      assert.deepStrictEqual(parsed, {
        ...defaultOptions,
        ignoreSegments: [
          new RegExp("^ignoreme$"),
          ...defaultOptions.ignoreSegments,
        ],
      });
    });

    it("should not add default ignore patterns if defaultIgnore is false", () => {
      /**
       * @type {import("./types").MatchOptionsObject}
       */
      const options = {
        defaultIgnore: false,
      };

      const parsed = parseOptions([options]);

      assert.deepStrictEqual(parsed, {
        ...defaultOptions,
        ignoreSegments: [],
      });
    });

    it("should not validate folders if validate folders is false", () => {
      /**
       * @type {import("./types").MatchOptionsObject}
       */
      const options = {
        validateFolders: false,
      };

      const parsed = parseOptions([options]);

      assert.deepStrictEqual(parsed, {
        ...defaultOptions,
        validateFolders: false,
      });
    });

    it("should not validate extensions if validate extensions is false", () => {
      /**
       * @type {import("./types").MatchOptionsObject}
       */
      const options = {
        validateExtensions: false,
      };

      const parsed = parseOptions([options]);

      assert.deepStrictEqual(parsed, {
        ...defaultOptions,
        validateExtensions: false,
      });
    });
  });
});
