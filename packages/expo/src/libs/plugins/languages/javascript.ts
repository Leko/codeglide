import { Language } from "./type";
import { extensions } from "linguist-languages/data/javascript.json";
import { extensionsToRegExp } from "./util";

const javascript: Language = {
  test: extensionsToRegExp(extensions),
  tokenize(selection: string): Array<string> {
    return selection
      .replace(/\'|\"/g, "")
      .split(/(\s|\t)+/)
      .map(w => w.trim())
      .filter(Boolean);
  }
};

export default javascript;
