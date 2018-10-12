import map from "language-map/languages.json";
import { LanguageName, LanguageType, LanguageGroup, Language } from "./type";
export { LanguageName, LanguageType, LanguageGroup, Language } from "./type";

const defaultColor = "#dddddd";

export const languages: Array<Language> = Object.entries(map).map(
  ([name, meta]) => ({
    name: name as LanguageName,
    type: meta.type as LanguageType,
    color: meta.color || defaultColor,
    extensions: meta.extensions || [],
    languageId: meta.languageId,
    group: meta.group as LanguageGroup,
    searchable: meta.searchable || false
  })
);

const extMap: { [ext: string]: Language } = languages.reduce(
  (acc, language) => ({
    ...acc,
    ...language.extensions.reduce(
      (acc2, ext) => ({
        ...acc2,
        [ext]: language
      }),
      {}
    )
  }),
  {}
);
const extName = (str: string) => {
  const sep = str.lastIndexOf(".");
  return str.slice(sep);
};
export const getColorByPath = (path: string): string => {
  const ext = extName(path);
  return ext && extMap[ext] ? extMap[ext].color : defaultColor;
};
