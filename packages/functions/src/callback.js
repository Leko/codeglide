const { URLSearchParams } = require("url");
const fetch = require("node-fetch").default;
const {
  sentry,
  redirectTo,
  stringify,
  validateRedirectUri
} = require("./util");
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

sentry();

exports.handler = async function(event, context) {
  if (!event.headers.cookie) {
    return {
      statusCode: 400,
      body: "malformed request"
    };
  }
  const cookie = event.headers.cookie
    .split(";")
    .map(part => part.trim().split("="))
    .reduce(
      (acc, [key, value]) => ({ ...acc, [key]: decodeURIComponent(value) }),
      {}
    );
  try {
    validateRedirectUri(cookie.redirect_uri);
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message
    };
  }

  if (!cookie.state) {
    return redirectTo(
      `${cookie.redirect_uri}?${stringify({
        error: "bad_request",
        error_description: "malformed request"
      })}`
    );
  }

  const code = event.queryStringParameters.code;
  if (!code) {
    return redirectTo(
      `${cookie.redirect_uri}?${stringify({
        error: "bad_request",
        error_description: "code must be required"
      })}`
    );
  }

  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        state: cookie.state,
        code: code
        // redirect_uri
      })
    });
    const credentials = await res.json();
    const params = new URLSearchParams();
    for (let p in credentials) {
      params.set(p, credentials[p]);
    }

    return redirectTo(`${cookie.redirect_uri}?${params.toString()}`);
  } catch (e) {
    // FIXME: Sentry
    return redirectTo(
      `${cookie.redirect_uri}?${stringify({
        error: "internal_server_error",
        error_description: "Unexpected error occured"
      })}`
    );
  }
};
