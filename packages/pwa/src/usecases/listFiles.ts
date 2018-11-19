import Octokit from "@octokit/rest";
import { Repository } from "@codeglide/domain";
import { searchDirectory } from "../modules";
import { State } from "../store";

const octokit = new Octokit();

export const listFiles = (repository: Repository, path: string) => async (
  dispatch,
  getState: () => State
) => {
  if (repository.owner === "" && repository.repository === "") {
    return;
  }
  dispatch(searchDirectory.creators.makeBusy());

  const res = await octokit.repos.getContent({
    owner: repository.owner,
    repo: repository.repository,
    path
  });
  dispatch(
    searchDirectory.creators.setResult({
      path,
      shallowTree: res.data
    })
  );
};
