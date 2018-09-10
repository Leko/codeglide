import { Language } from "./type";

const javascript: Language = {
  test: /\.(js|json)$/,
  tokenize(selection: string): Array<string> {
    return selection.replace(/\'|\"/g, "").split(/\s+/);
  }
};

export default javascript;
