import negate from "lodash/negate";

type BaseName = string;
type DirName = string;
type ObjectId = string;
type Url = string;

export type TreeEntry = {
  name: BaseName;
  path: DirName;
  sha: ObjectId;
  size: 338;
  url: Url;
  html_url: Url;
  git_url: Url;
  download_url: Url;
  type: "file" | "dir" | "submodule";
};
export type ShallowTree = ReadonlyArray<TreeEntry>;

export const isFile = ({ type }: TreeEntry): boolean => type === "file";

export const omitFile = (tree: ShallowTree): ShallowTree =>
  tree.filter(negate(isFile));

export const fileTypeComparator = ({ type }: TreeEntry) =>
  ["submodule", "dir", "file"].indexOf(type);
