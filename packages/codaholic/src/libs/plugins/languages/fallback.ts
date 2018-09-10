import { Language } from "./type";

const fallback: Language = {
  test: /.*/,
  tokenize(selection: string): Array<string> {
    return selection.replace(/\'|\"/g, "").split(/\s+/);
  }
};

export default fallback;
