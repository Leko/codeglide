import { FileContent } from "../FileContent";
import { State } from "./state";

export const open = (
  state: State,
  {
    file,
    content
  }: {
    file: FileContent;
    content: string;
  }
): State => ({
  ...state,
  file,
  content
});

export const close = (): State => ({ file: null, content: null });
