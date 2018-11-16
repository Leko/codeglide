import Octokit, {
  SearchCodeParams as OctoKitSearchCodeParams
} from "@octokit/rest";
import {
  SearchParamsState,
  CodeSearchResult,
  CodeSearchParams
} from "@codeglide/domain";
import {
  searchCode as searchCodeModule,
  searchHistory as searchHistoryModule
} from "../modules";
import { State } from "../store";

const octokit = new Octokit({
  headers: {
    accept: "application/vnd.github.v3.text-match+json"
  }
});

export const searchCode = (query: SearchParamsState) => async (
  dispatch,
  getState: () => State
) => {
  if (!query.repo) {
    // FIXME: Validation error
    return;
  }
  dispatch(searchCodeModule.creators.clear());
  dispatch(searchCodeModule.creators.start());

  const prettyQuery = {
    repo: `${query.repo.owner}/${query.repo.repository}`,
    in: query.in,
    path: query.path,
    language: query.language
    // fork?: true | "only"
  };
  const q = `${query.q} `;
  const params: OctoKitSearchCodeParams = {
    q:
      q +
      Object.entries(prettyQuery)
        .filter(([_, value]) => value != null)
        .map(([key, value]) => `${key}:${value}`)
        .join(" ")
  };
  const { data }: { data: CodeSearchResult } = await octokit.search.code({
    ...params,
    per_page: 100,
    page: 1 // FIXME: paging
  });

  if (Array.isArray(data.errors)) {
    data.errors.forEach(console.error);
    const errors = data.errors.map(
      ({ code, message }) => new Error(`${code}: ${message}`)
    );
    dispatch(searchCodeModule.creators.setErrors(errors));
    return;
  }
  if (!data.items) {
    // TODO: Error handling
    throw new Error("Search failed");
  }

  dispatch(searchCodeModule.creators.setResults(data));
  dispatch(searchHistoryModule.creators.append(query as CodeSearchParams));
};
