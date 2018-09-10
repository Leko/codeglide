import { Language } from "./type";

const fallback: Language = {
  test: /.*/,
  tokenize(selection: string): Array<string> {
    return selection
      .replace(/\'|\"/g, "")
      .split(/(\s|\t)+/)
      .map(w => w.trim())
      .filter(Boolean);
  }
};

export default fallback;
