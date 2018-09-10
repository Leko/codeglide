import npm from "./package-manager/npm";

const extensions = [npm];

export const getMatches = (path: string) => {
  return extensions.filter(ext => ext.test.test(path));
};
