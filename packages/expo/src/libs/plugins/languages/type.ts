export interface Language {
  test: RegExp;
  tokenize: (selection: string) => Array<string>;
}
