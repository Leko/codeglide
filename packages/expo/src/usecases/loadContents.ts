import { Buffer } from "buffer"; // https://github.com/feross/buffer#usage
import Sentry from "sentry-expo";
import fetch from "cross-fetch";
import querystring from "query-string";
import { creators } from "../modules/file";
import { selectors } from "../modules/user";
import * as analytics from "../libs/ga";

export type SearchParams = {
  repository: string; // ex. Leko/hothouse
  path: string;
  ref?: string;
};

export default ({ repository, path, ref }: SearchParams) => async (
  dispatch,
  getState
) => {
  dispatch(creators.dismiss());

  const q = querystring.stringify({ ref });
  const url = `https://api.github.com/repos/${repository}/contents/${path}?${q}`;
  analytics.trackEvent("preview", "loadStart", {
    label: `${repository}/${path}/${ref}`
  });
  const accessToken = selectors.getCredential(getState());
  const found = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : ""
    }
  }).then(res => res.json());

  const MB = (1 << 10) << 10;
  const { message, size, encoding } = found;
  let contents;
  if (message === "Not Found") {
    analytics.trackEvent("preview", "load:failed", {
      label: "NOT_FOUND"
    });
    // TODO: Error handling
  } else if (size > MB) {
    analytics.trackEvent("preview", "warning", {
      label: "SIZE_LIMIT_EXCEEDED"
    });
    // TODO: Warning on over 1MB
  } else if (found.content && encoding === "base64") {
    const startedAt = new Date();
    contents = Buffer.from(found.content, "base64").toString("utf8");
    analytics.trackEvent("preview", "decode", {
      value: new Date().getTime() - startedAt.getTime()
    });
  } else if (found.content) {
    contents = found.content;
  } else {
    analytics.trackEvent("preview", "load:failed", {
      label: "UNKNOWN"
    });
    Sentry.captureBreadcrumb({
      message,
      data: found
    });
    throw new Error("Unexpected error occured");
  }

  analytics.trackEvent("preview", "load:success", {
    value: size
  });
  dispatch(
    creators.open({
      repository,
      path,
      contents
    })
  );
};
