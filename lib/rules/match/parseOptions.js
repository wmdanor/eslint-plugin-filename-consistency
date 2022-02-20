const { cases, defaultIgnore, defaultCase } = require('./constants');

/**
 * @param {Options} options
 * @return ParsedOptions
 */
function parseOptions(options) {
  const [matchOptions] = options;

  // const parsedMatchOptions = parseMatchOptions.parse(matchOptions);
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
    };
  },

  /**
   * @param {MatchOptionsCase} options
   * @return ParsedOptions
   */
  string(options) {
    return {
      match: [cases[options]],
      ignore: [...defaultIgnore],
    };
  },

  /**
   * @param {Array<MatchOptionsCase>} options
   * @return ParsedOptions
   */
  array(options) {
    const match = [];

    for (const str of options) {
      const regex = cases[str];
      match.push(regex);
    }

    return {
      match,
      ignore: [...defaultIgnore],
    };
  },

  /**
   * @param {MatchOptionsObject} options
   * @return ParsedOptions
   */
  object(options) {
    const match = [];
    const ignore = [];

    for (const str of options.match ?? []) {
      const regex = cases[str];
      match.push(regex);
    }

    for (const str of options.ignore ?? []) {
      const regex = new RegExp(str);
      ignore.push(regex);
    }

    if (options.defaultIgnore === false) {
      ignore.push(...defaultIgnore);
    }

    return {
      match,
      ignore,
    };
  },
};

module.exports = {
  parseOptions,
};
