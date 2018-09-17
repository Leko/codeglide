import npm from "./package-manager/npm";
import url from "./package-manager/url";

const extensions = [npm, url];

export const getMatches = (path: string) => {
  return extensions.filter(ext => ext.test.test(path));
};
