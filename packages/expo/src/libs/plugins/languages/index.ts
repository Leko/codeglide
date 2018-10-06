import { Language } from "./type";
import fallback from "./fallback";
import javascript from "./javascript";
import markdown from "./markdown";

const languages: Array<Language> = [javascript, markdown];

export const getMatch = (path: string): Language => {
  return languages.find(lang => lang.test.test(path)) || fallback;
};
