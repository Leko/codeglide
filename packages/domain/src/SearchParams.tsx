export type SearchParams = {
  q: string;
  repo: string; // ex. Leko/hothouse
  in?: "file" | "path" | "file,path";
  path?: string;
  language?: string; // FIXME: Make enum
  // fork?: true | "only"
};
