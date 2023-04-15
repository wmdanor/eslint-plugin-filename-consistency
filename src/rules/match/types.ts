export type MatchOptions =
  | MatchOptionsCase
  | MatchOptionsCase[]
  | MatchOptionsObject;

export interface ParsedOptions {
  match: RegExp[];
  ignore: RegExp[];
  validateFolders: boolean;
  validateExtensions: boolean;
}

export interface ValidationError {
  message: string;
  data: Record<string, string>;
}

export interface MatchOptionsObject {
  match: MatchOptionsCase[];
  ignore: Array<string | RegExp>;
  defaultIgnore: boolean;
  validateFolders: boolean;
  validateExtensions: boolean;
}

export type MatchOptionsCase = 'camel' | 'snake' | 'kebab' | 'pascal';
