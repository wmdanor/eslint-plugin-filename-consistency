'use strict';

module.exports = {};

/**
 * @typedef {import('eslint').Rule.RuleContext & MyRuleModule & PolyfillRuleModule} RuleContext
 */

/**
 * @typedef {Object} MyRuleModule
 * @property {Options} options
 */

/**
 * RuleContext polyfill for WebStorm
 * @typedef {Object} PolyfillRuleModule
 * @property {() => string} getCwd
 * @property {() => string} getFilename
 */

/**
 * @typedef {import('eslint').Rule.RuleModule & PolyfillRuleModule} RuleModule
 */

/**
 * RuleModule polyfill for WebStorm
 * @typedef {Object} PolyfillRuleModule
 * @property {(context: RuleContext) => Function} create
 * @property {Record<string, any>} meta
 */

/**
 * Unfortunately no support of tuples in JSDoc yet
 * @typedef {[MatchOptions]} Options
 */

/**
 * @typedef {
 *  MatchOptionsCase,
 *  MatchOptionsCase[],
 *  MatchOptionsObject
 * } MatchOptions
 */

/**
 * @typedef {Object} ParsedOptions
 * @property {RegExp[]} match
 * @property {RegExp[]} ignore
 * @property {boolean} validateFolders
 * @property {boolean} validateExtensions
 */

/**
 * @typedef {
 *  'camel',
 *  'snake',
 *  'kebab',
 *  'pascal'
 * } MatchOptionsCase
 */

/**
 * @typedef {Object} MatchOptionsObject
 * @property {MatchOptionsCase[]} match
 * @property {Array<string | RegExp>} ignore
 * @property {boolean} defaultIgnore
 * @property {boolean} validateFolders
 * @property {boolean} validateExtensions
 */

/**
 * @typedef {Object} ValidationError
 * @property {string} message
 * @property {Record<string, string | number | boolean>} data
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
