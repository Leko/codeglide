const { URL, URLSearchParams } = require("url");
const Sentry = require("@sentry/node");
const { GITHUB_REDIRECT_WHITELIST } = process.env;

exports.sentry = () => {
  Sentry.init({
    dsn: "https://f7f88dce61dc410b82ab4dfedadc7eee@sentry.io/1292100",
    debug: process.env.NODE_ENV !== "production",
    environment: process.env.NODE_ENV
  });
};

exports.wrap = fn => (event, context, callback) => {
  fn(event, context)
    .then(res => {
      callback(null, res);
    })
    .catch(e => {
      console.error(e.stack);
      callback(e);
    });
};

exports.redirectTo = (url, headers = {}) => ({
  statusCode: 302,
  headers: {
    Location: url,
    ...headers
  },
  body: ""
});

exports.stringify = query => {
  const params = new URLSearchParams();
  for (let p in query) {
    params.set(p, query[p]);
  }
  return params.toString();
};

exports.isAllowedRedirectUri = redirectUri => {
  return GITHUB_REDIRECT_WHITELIST.split(",")
    .map(uri => uri.trim())
    .some(uri => redirectUri.startsWith(uri));
};

exports.validateRedirectUri = redirectUri => {
  if (!redirectUri) {
    throw new Error("redirect_uri must be required");
  }
  try {
    new URL(redirectUri);
  } catch (e) {
    console.log(e, redirectUri);
    throw new Error("malformed redirect_uri");
  }
  if (!exports.isAllowedRedirectUri(redirectUri)) {
    throw new Error("redirect_uri mismatch");
  }
};
