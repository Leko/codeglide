import { Buffer } from "buffer"; // https://github.com/feross/buffer#usage
import Sentry from "sentry-expo";
import fetch from "cross-fetch";
import querystring from "query-string";
import { creators } from "../modules/file";

export type SearchParams = {
  repository: string; // ex. Leko/hothouse
  path: string;
  ref?: string;
};

export default ({ repository, path, ref }: SearchParams) => async dispatch => {
  dispatch(creators.dismiss());

  const q = querystring.stringify({ ref: ref });
  const url = `https://api.github.com/repos/${repository}/contents/${path}?${q}`;
  const found = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  }).then(res => res.json());

  const MB = (1 << 10) << 10;
  const { message, size, encoding } = found;
  let contents;
  if (message === "Not Found") {
    // TODO: Error handling
  } else if (size > MB) {
    // TODO: Warning on over 1MB
  } else if (found.content && encoding === "base64") {
    contents = Buffer.from(found.content, "base64").toString("utf8");
  } else if (found.content) {
    contents = found.content;
  } else {
    Sentry.captureBreadcrumb({
      message,
      data: found
    });
    throw new Error("Unexpected error occured");
  }

  dispatch(
    creators.open({
      repository,
      path,
      contents
    })
  );
};
