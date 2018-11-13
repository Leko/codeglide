import Octokit from "@octokit/rest";
import { Repository } from "@codeglide/domain";
import { searchRepository } from "../modules";
import { State } from "../store";

const octokit = new Octokit();

export const searchRepositories = (repository: Repository) => async (
  dispatch,
  getState: () => State
) => {
  if (repository.owner === "" && repository.repository === "") {
    return;
  }
  dispatch(searchRepository.creators.makeBusy());

  let q = " ";
  if (repository.owner) {
    q += `${repository.repository} user:${repository.owner}`;
  } else {
    q += `${repository.owner} repo:${repository.repository}`;
  }
  const res = await octokit.search.repos({
    q,
    sort: "stars",
    per_page: 100
  });
  dispatch(searchRepository.creators.setResult(res.data));
  console.log(res);
};
