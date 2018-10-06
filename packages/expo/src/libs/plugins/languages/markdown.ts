import { Language } from "./type";
import { extensions } from "linguist-languages/data/markdown.json";
import { extensionsToRegExp } from "./util";

const fallback: Language = {
  test: extensionsToRegExp(extensions),
  tokenize(selection: string): Array<string> {
    return selection
      .replace(/\'|\"|\`/g, "")
      .replace(/^(\#+|\s*\*|\s*\-|\>)/g, "")
      .split(/(\s|\t)+/g)
      .map(w => w.trim())
      .filter(Boolean);
  }
};

export default fallback;
