// import { SearchCodeParams } from "@octokit/rest";
import { creators } from "../modules/user";
import getCredential from "../selectors/getCredential";

export type SearchParams = {};

const octokit = require("@octokit/rest")();

export default (query: SearchParams) => async (dispatch, getState) => {
  const token = getCredential(getState());
  console.log({ token });
  octokit.authenticate({
    type: "oauth",
    token
  });

  const params: SearchCodeParams = {
    q: Object.entries(query)
      .map(([key, value]) => `${key}:${value}`)
      .join(" ")
  };
  console.log(await octokit.search.code(params));

  // TODO: redux stateに持って、nextPageが呼べるようにしておいたほうがいいかも？
};
