import { MatchOptionsCase } from './types';

export const cases: Readonly<Record<MatchOptionsCase, RegExp>> = {
  camel: /^([a-z][a-z0-9]*)(([A-Z]|[.][a-z])[a-z0-9]*)*$/,
  pascal: /^([A-Z][a-z0-9]*)(([A-Z]|[.][A-Z])[a-z0-9]*)*$/,
  snake: /^([a-z][a-z0-9]*)([_.][a-z0-9]+)*$/,
  kebab: /^([a-z][a-z0-9]*)([-.][a-z0-9]+)*$/,
};

export const casesNames: ReadonlyArray<string> = Object.keys(cases);

export const defaultCase = cases.camel;

export const defaultIgnore: ReadonlyArray<RegExp> = [
  /readme/i,
  /license/i,
  /contributing/i,
  /^index/,
];
