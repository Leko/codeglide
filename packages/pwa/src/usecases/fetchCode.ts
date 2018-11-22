import Octokit from "@octokit/rest";
import { Repository, FileContent } from "@codeglide/domain";
import { codeView } from "../modules";
import { State } from "../store";

const octokit = new Octokit();

export const fetchCode = (
  repository: Repository,
  sha: string,
  path: string
) => async (dispatch, getState: () => State) => {
  if (repository.owner === "" || repository.repository === "" || !path) {
    return;
  }

  try {
    const MB = (1 << 10) << 10;

    dispatch(codeView.creators.close());

    const {
      data: found
    }: { data: FileContent } = await octokit.repos.getContent({
      owner: repository.owner,
      repo: repository.repository,
      path,
      ref: sha
    });
    const { message, size, encoding } = found;

    if (message) {
      throw new Error(message);
    }
    if (size > MB) {
      console.warn("TODO: Warning on over 1MB");
    }

    let code;
    if (found.content && encoding === "base64") {
      // code = Buffer.from(found.content, "base64").toString("utf8");
      code = atob(found.content);
    } else if (found.content) {
      code = found.content;
    } else {
      throw new Error("Unexpected error occured");
    }

    dispatch(
      codeView.creators.open({
        file: found,
        content: code
      })
    );
  } catch (e) {
    // TODO: Error handling
    console.error(e);
  } finally {
  }
};
