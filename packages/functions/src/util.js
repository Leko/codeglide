const { URLSearchParams } = require("url");

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
  for (let p in credentials) {
    params.set(p, credentials[p]);
  }
  return params.toString();
};
