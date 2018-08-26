// import { SearchCodeParams } from "@octokit/rest";
import Sentry from "sentry-expo";
import fetch from "cross-fetch";
import omit from "lodash/omit";
import querystring from "query-string";
import { creators } from "../modules/codeSearch";
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
  dispatch(creators.clear());
  dispatch(creators.start());

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

  if (Array.isArray(found.errors)) {
    found.errors.forEach(({ code, field, message }) => {
      Sentry.captureBreadcrumb({
        message,
        category: code,
        data: {
          field,
          query,
          params,
          url
        }
      });
    });
  }
  // TODO: Error handling
  if (!found.items) {
    throw new Error("Search failed");
  }

  const { items, total_count, incomplete_results } = found;
  dispatch(
    creators.setResults({
      results: items,
      totalResults: total_count,
      completed: incomplete_results
    })
  );
  // found.items.forEach(item => {
  //   console.log("------------------------------------------------------");
  //   item.text_matches.forEach(match => {
  //     console.log(match);
  //     match.matches.reduce((acc, { indices: [start, end] }) => {
  //       // match.fragment.substring(start, end)
  //       // console.log({ start, end });
  //     }, match.fragment);
  //     console.log("---");
  //   });
  //   console.log(
  //     `\nIn: ${item.path}/${item.name} (${item.repository.owner.avatar_url})`
  //   );
  // });
};
