// import { SearchCodeParams } from "@octokit/rest";
import fetch from "cross-fetch";
import omit from "lodash/omit";
import querystring from "query-string";
import { creators } from "../modules/user";
import getCredential from "../selectors/getCredential";

export type SearchParams = {
  q: string,
  repo: string, // ex. Leko/hothouse
  in?: "file" | "path" | "file,path",
  path?: string,
  language?: string // FIXME: Make enum
  // fork?: true | "only"
};

// const octokit = require("@octokit/rest")();

export default (query: SearchParams) => async (dispatch, getState) => {
  console.log(query);
  const q = `${query.q} `;
  const params: SearchCodeParams = {
    q:
      q +
      Object.entries(omit(query, "q"))
        .filter(([key, value]) => value != null)
        .map(([key, value]) => `${key}:${value}`)
        .join(" ")
  };
  const url =
    "https://api.github.com/search/code?" + querystring.stringify(params);

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
