import { State } from "./state";
import { LanguageName } from "@codeglide/languages";
import { Repository } from "../Repository";

export const setLanguageName = (
  state: State,
  language: LanguageName
): State => {
  return {
    ...state,
    language
  };
};

export const setRepository = (state: State, repo: Repository): State => {
  return {
    ...state,
    repo
  };
};

export const setDirectory = (state: State, path: string): State => {
  return {
    ...state,
    path
  };
};
