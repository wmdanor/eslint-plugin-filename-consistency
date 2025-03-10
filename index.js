"use strict";

const { create, meta } = require("./lib/rules/match");

module.exports = {
  rules: {
    match: {
      create,
      meta,
    },
  },
};
