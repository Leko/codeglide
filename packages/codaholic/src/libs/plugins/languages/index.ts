import { Language } from "./type";
import fallback from "./fallback";
import javascript from "./javascript";

const languages: Array<Language> = [javascript];

export const getMatch = (path: string): Language => {
  return languages.find(lang => lang.test.test(path)) || fallback;
};
