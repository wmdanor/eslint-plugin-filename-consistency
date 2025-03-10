"use strict";

const {
  cases,
  defaultIgnoreSegments,
  defaultOptions: defaultOptionsC,
} = require("./constants");

/**
 * @param {import("./types").Options} options
 * @return {import("./types").ParsedOptions}
 */
function parseOptions(options) {
  const [matchOptions] = options;

  if (!matchOptions) {
    return defaultOptions();
  }

  if (typeof matchOptions === "string") {
    return parseStringOptions(matchOptions);
  }

  if (matchOptions instanceof Array) {
    return parseArrayOptions(matchOptions);
  }

  return parseObjectOptions(matchOptions);
}

/**
 * @return {import("./types").ParsedOptions}
 */
function defaultOptions() {
  return {
    ...defaultOptionsC,
  };
}

/**
 * @param {import("./types").MatchOptionsCase} options
 * @return {import("./types").ParsedOptions}
 */
function parseStringOptions(options) {
  return {
    ...defaultOptions(),
    match: [cases[options]],
  };
}

/**
 * @param {import("./types").MatchOptionsCase[]} options
 * @return {import("./types").ParsedOptions}
 */
function parseArrayOptions(options) {
  const match = [];

  for (const str of options) {
    const regex = cases[str];
    match.push(regex);
  }

  return {
    ...defaultOptions(),
    match,
  };
}

/**
 * @param {import("./types").MatchOptionsObject} options
 * @return {import("./types").ParsedOptions}
 */
function parseObjectOptions(options) {
  /**
   * @type {import("./types").ParsedOptions}
   */
  const parsed = {
    ...defaultOptions(),
    ignoreSegments: [],
  };

  if (options.match) {
    parsed.match = [];

    for (const str of options.match ?? []) {
      const regex = cases[str];
      parsed.match.push(regex);
    }
  }

  for (const str of options.ignore ?? []) {
    const regex = new RegExp(str);
    parsed.ignore.push(regex);
  }

  for (const str of options.ignoreSegments ?? []) {
    const regex = new RegExp(str);
    parsed.ignoreSegments.push(regex);
  }

  if (options.defaultIgnore !== false) {
    parsed.ignoreSegments.push(...defaultIgnoreSegments);
  }

  if (options.validateFolders === false) {
    parsed.validateFolders = false;
  }

  if (options.validateExtensions === false) {
    parsed.validateExtensions = false;
  }

  return parsed;
}

module.exports = {
  parseOptions,
};
