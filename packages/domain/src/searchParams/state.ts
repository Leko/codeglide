import { LanguageName } from "@codeglide/languages";
import { Repository } from "../Repository";

export type State = {
  q?: string;
  repo?: Repository;
  in?: "path"; // FIXME: Add supports `| "file" | "file,path"`
  path?: string;
  language?: LanguageName;
  // fork?: true | "only"
};
