"use strict";

const { create } = require("./create");
const { meta } = require("./meta");

/**
 * @type {import("./types").RuleModule}
 */
const ruleModule = {
  create,
  meta,
};

module.exports = ruleModule;
