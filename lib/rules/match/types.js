/**
 * @typedef {import('eslint').Rule.RuleContext | ThisRuleModule | PolyfillRuleModule} RuleContext
 */

/**
 * @typedef {Object} ThisRuleModule
 * @property {Options} options
 */

/**
 * RuleContext polyfill for WebStorm
 * @typedef {Object} PolyfillRuleModule
 * @property {() => string} getCwd
 * @property {() => string} getFilename
 */

/**
 * @typedef {import('eslint').Rule.RuleModule | PolyfillRuleModule} RuleModule
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
 *  Array<MatchOptionsCase>,
 *  MatchOptionsObject
 * } MatchOptions
 */

/**
 * @typedef {Object} ParsedOptions
 * @property {RegExp[]} match
 * @property {RegExp[]} ignore
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
 * @property {Array<MatchOptionsCase>} match
 * @property {Array<string | RegExp>} ignore
 * @property {boolean} defaultIgnore
 */
