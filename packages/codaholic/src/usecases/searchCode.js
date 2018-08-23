// import { SearchCodeParams } from "@octokit/rest";
import fetch from "cross-fetch";
import querystring from "query-string";
import { creators } from "../modules/user";
import getCredential from "../selectors/getCredential";

export type SearchParams = {};

// const octokit = require("@octokit/rest")();

export default (query: SearchParams) => async (dispatch, getState) => {
  // const token = getCredential(getState());
  // console.log({ token });
  // octokit.authenticate({
  //   type: "oauth",
  //   token
  // });

  // query.user = "Leko";
  query.repo = "Leko/hothouse";

  const params: SearchCodeParams = {
    q: Object.entries(query)
      .map(([key, value]) => `${key}:${value}`)
      .join(" ")
  };
  params.q = "jest " + params.q;
  const url =
    "https://api.github.com/search/code?" + querystring.stringify(params);

  console.log(params, url);

  const found = await fetch(url, {
    method: "GET",
    headers: {
      // https://developer.github.com/v3/search/#text-match-metadata
      Accept: "application/vnd.github.v3.text-match+json"
    }
  }).then(res => res.json());

  found.items.forEach(item => {
    console.log("------------------------------------------------------");
    item.text_matches.forEach(match => {
      console.log(match);
      match.matches.reduce((acc, { indices: [start, end] }) => {
        // match.fragment.substring(start, end)
        // console.log({ start, end });
      }, match.fragment);
      console.log("---");
    });
    console.log(
      `\nIn: ${item.path}/${item.name} (${item.repository.owner.avatar_url})`
    );
  });

  // TODO: redux stateに持って、nextPageが呼べるようにしておいたほうがいいかも？
};
