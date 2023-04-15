import { cases, defaultIgnore, defaultCase } from './constants';
import {
  MatchOptions,
  MatchOptionsCase,
  MatchOptionsObject,
  ParsedOptions,
} from './types';

export function parseOptions(options: [MatchOptions]): ParsedOptions {
  const [matchOptions] = options;

  const parsedMatchOptions = parseOptions.match.parse(matchOptions);

  return {
    ...parsedMatchOptions,
  };
}

parseOptions.match = {
  parse(options: MatchOptions): ParsedOptions {
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

  default(): ParsedOptions {
    return {
      match: [defaultCase],
      ignore: [...defaultIgnore],
      validateFolders: true,
      validateExtensions: true,
    };
  },

  string(options: MatchOptionsCase): ParsedOptions {
    return {
      ...this.default(),
      match: [cases[options]],
    };
  },

  array(options: MatchOptionsCase[]): ParsedOptions {
    const match: RegExp[] = [];

    for (const str of options) {
      const regex = cases[str];

      match.push(regex);
    }

    return {
      ...this.default(),
      match,
    };
  },

  object(options: MatchOptionsObject): ParsedOptions {
    const parsed: ParsedOptions = {
      ...this.default(),
      ignore: [],
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

    if (options.defaultIgnore !== false) {
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
