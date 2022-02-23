'use strict';

const cases = {
  camel: /^([a-z][a-z0-9]*)(([A-Z]|[.][a-z])[a-z0-9]*)*$/,
  pascal: /^([A-Z][a-z0-9]*)(([A-Z]|[.][A-Z])[a-z0-9]*)*$/,
  snake: /^([a-z][a-z0-9]*)([_.][a-z0-9]+)*$/,
  kebab: /^([a-z][a-z0-9]*)([-.][a-z0-9]+)*$/,
};
const casesNames = Object.keys(cases);

const defaultCase = cases.camel;
const defaultIgnore = [/readme/i, /license/i, /contributing/i, /^index/];

module.exports = {
  cases,
  casesNames,
  defaultCase,
  defaultIgnore,
};
