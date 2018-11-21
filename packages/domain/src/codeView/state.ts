import { FileContent } from "../FileContent";

export type State = {
  readonly file: FileContent | null;
  readonly content: string | null;
};
