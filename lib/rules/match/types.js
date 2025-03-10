"use strict";

module.exports = {};

/**
 * @typedef {import('eslint').Rule.RuleContext & MyRuleModule} RuleContext
 */

/**
 * @typedef {Object} MyRuleModule
 * @property {Options} options
 */

/**
 * @typedef {import('eslint').Rule.RuleModule} RuleModule
 */

/**
 * @typedef {[MatchOptions] | []} Options
 */

/**
 * @typedef {MatchOptionsCase | MatchOptionsCase[] | MatchOptionsObject} MatchOptions
 */

/**
 * @typedef {Object} ParsedOptions
 * @property {RegExp[]} match
 * @property {RegExp[]} ignore
 * @property {boolean} validateFolders
 * @property {boolean} validateExtensions
 */

/**
 * @typedef {'camel' | 'snake' | 'kebab' | 'pascal'} MatchOptionsCase
 */

/**
 * @typedef {Object} MatchOptionsObject
 * @property {MatchOptionsCase[]} [match]
 * @property {Array<string | RegExp>} [ignore]
 * @property {boolean} [defaultIgnore]
 * @property {boolean} [validateFolders]
 * @property {boolean} [validateExtensions]
 */

/**
 * @typedef {Object} ValidationError
 * @property {string} message
 * @property {Record<string, string>} data
 */

/**
 * @typedef {Object} MyParsedPath
 * @property {string} root
 * @property {string} dir
 * @property {string} base
 * @property {string} ext
 * @property {string} name
 * @property {string} path
 */
