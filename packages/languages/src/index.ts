import map from "language-map/languages.json";
import { LanguageName, LanguageType, LanguageGroup, Language } from "./type";

export { LanguageName, LanguageType, LanguageGroup, Language } from "./type";

export const languages: Array<Language> = Object.entries(map).map(
  ([name, meta]) => ({
    name: name as LanguageName,
    type: meta.type as LanguageType,
    color: meta.color || "#dddddd",
    extensions: meta.extensions || [],
    languageId: meta.languageId,
    group: meta.group as LanguageGroup,
    searchable: meta.searchable || false
  })
);
