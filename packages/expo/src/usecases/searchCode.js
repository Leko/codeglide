import Sentry from "sentry-expo";
import fetch from "cross-fetch";
import omit from "lodash/omit";
import querystring from "query-string";
import { creators as codeSearchCreators } from "../modules/codeSearch";
import { creators as historyCreators } from "../modules/searchHistory";
import { selectors } from "../modules/user";
import * as analytics from "../libs/ga";

export type SearchParams = {
  q: string,
  repo: string, // ex. Leko/hothouse
  in?: "file" | "path" | "file,path",
  path?: string,
  language?: string // FIXME: Make enum
  // fork?: true | "only"
};

export default (query: SearchParams) => async (dispatch, getState) => {
  dispatch(codeSearchCreators.clear());
  dispatch(codeSearchCreators.start());

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
  analytics.trackEvent("search", "start", {
    label: querystring.stringify(params)
  });
  const accessToken = selectors.getCredential(getState());
  const found = await fetch(url, {
    method: "GET",
    headers: {
      // https://developer.github.com/v3/search/#text-match-metadata
      Accept: "application/vnd.github.v3.text-match+json",
      Authorization: accessToken ? `Bearer ${accessToken}` : ""
    }
  }).then(res => res.json());

  console.log(found.errors);
  if (Array.isArray(found.errors)) {
    found.errors.forEach(({ code, field, message }) => {
      analytics.trackEvent("search", "failed", {
        label: message
      });
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
    const errors = found.errors.map(
      ({ code, message }) => new Error(`${code}: ${message}`)
    );
    dispatch(codeSearchCreators.setErrors(errors));
    return;
  }
  // TODO: Error handling
  if (!found.items) {
    analytics.trackEvent("search", "failed", {
      label: "UNKNOWN"
    });
    throw new Error("Search failed");
  }

  const { items, total_count, incomplete_results } = found;
  analytics.trackEvent("search", "success", {
    label: incomplete_results ? "INCOMPLETE" : "COMPLETE",
    value: total_count
  });
  dispatch(
    codeSearchCreators.setResults({
      results: items,
      totalResults: total_count,
      completed: incomplete_results
    })
  );
  dispatch(historyCreators.append(query));
};
