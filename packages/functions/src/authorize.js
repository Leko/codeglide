const { URL, URLSearchParams } = require("url");
const { GITHUB_CLIENT_ID } = process.env;

exports.handler = async function(event, context) {
  const redirect_uri = event.queryStringParameters.redirect_uri;
  const state = event.queryStringParameters.state;
  if (!redirect_uri) {
    return {
      statusCode: 400,
      body: "redirect_uri must be required"
    };
  }
  if (!state) {
    return {
      statusCode: 400,
      body: "state must be required"
    };
  }
  try {
    new URL(redirect_uri);
  } catch (e) {
    return {
      statusCode: 400,
      body: "malformed redirect_uri"
    };
  }

  const params = new URLSearchParams("");
  params.set("client_id", GITHUB_CLIENT_ID);
  // params.set("redirect_uri", redirect_uri);
  params.set("scope", ["repo"].join(" "));
  // params.set('state', '')
  // params.set("allow_signup", "false");

  return {
    statusCode: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
      "Set-Cookie": `redirect_uri=${encodeURIComponent(
        redirect_uri
      )}; max-age=300; HttpOnly`
      // 'Set-Cookie': `id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly`
    },
    body: ""
  };
};
