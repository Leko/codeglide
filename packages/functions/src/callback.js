const { URLSearchParams } = require("url");
const fetch = require("node-fetch").default;
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

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
  // TODO: Whitelisting
  if (!cookie.redirect_uri) {
    return {
      statusCode: 400,
      body: "malformed request"
    };
  }

  const code = event.queryStringParameters.code;
  if (!code) {
    return {
      statusCode: 400,
      body: "code must be required"
    };
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
        code
        // state
        // redirect_uri
      })
    });
    const credentials = await res.json();
    const params = new URLSearchParams();
    for (let p in credentials) {
      params.set(p, credentials[p]);
    }

    return {
      statusCode: 302,
      headers: {
        Location: `${cookie.redirect_uri}?${params.toString()}`
      },
      body: ""
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: "Unexpected error occured"
    };
  }

  return {
    statusCode: 200,
    headers: {},
    body: "OK"
  };
};
