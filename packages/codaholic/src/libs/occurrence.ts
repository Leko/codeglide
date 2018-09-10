import { findAll } from "highlight-words-core";

type MatchedChunk = {
  start: number;
  end: number;
  highlight: boolean;
};

export const occurrences = (str: string, words: Array<string>) =>
  getMatches(str, words).filter(({ highlight }: MatchedChunk) => highlight)
    .length;

export const getMatches = (
  text: string,
  words: Array<string>
): Array<MatchedChunk> => {
  return findAll({
    textToHighlight: text,
    searchWords: words,
    autoEscape: true
  });
};
