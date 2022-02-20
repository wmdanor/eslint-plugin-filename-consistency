'use strict';

const { cases, defaultIgnore, defaultCase } = require('./constants');

/**
 * @param {Options} options
 * @return ParsedOptions
 */
function parseOptions(options) {
  const [matchOptions] = options;

  const parsedMatchOptions = parseOptions.match.parse(matchOptions);

  return {
    ...parsedMatchOptions,
  };
}

parseOptions.match = {
  /**
   * @param {MatchOptions} options
   * @return ParsedOptions
   */
  parse(options) {
    if (!options) {
      return this.default();
    }

    if (typeof options === 'string') {
      return this.string(options);
    }

    if (options instanceof Array) {
      return this.array(options);
    }

    return this.object(options);
  },

  /**
   * @return ParsedOptions
   */
  default() {
    return {
      match: [defaultCase],
      ignore: [...defaultIgnore],
      validateFolders: true,
      validateExtensions: true,
    };
  },

  /**
   * @param {MatchOptionsCase} options
   * @return ParsedOptions
   */
  string(options) {
    return {
      ...this.default(),
      match: [cases[options]],
    };
  },

  /**
   * @param {MatchOptionsCase[]} options
   * @return ParsedOptions
   */
  array(options) {
    const match = [];

    for (const str of options) {
      const regex = cases[str];
      match.push(regex);
    }

    return {
      ...this.default(),
      match,
    };
  },

  /**
   * @param {MatchOptionsObject} options
   * @return ParsedOptions
   */
  object(options) {
    const parsed = {
      ...this.default(),
      match: [],
      ignore: [],
    };

    for (const str of options.match ?? []) {
      const regex = cases[str];
      parsed.match.push(regex);
    }

    for (const str of options.ignore ?? []) {
      const regex = new RegExp(str);
      parsed.ignore.push(regex);
    }

    if (options.defaultIgnore === false) {
      parsed.ignore.push(...defaultIgnore);
    }

    if (options.validateFolders === false) {
      parsed.validateFolders = false;
    }

    if (options.validateExtensions === false) {
      parsed.validateExtensions = false;
    }

    return parsed;
  },
};

module.exports = {
  parseOptions,
};
