import { AuthSession } from "expo";
import crypto from "crypto-js/core";
import qs from "query-string";
import env from "../env";
import { creators } from "../modules/user";

export default () => async dispatch => {
  const redirectUrl = AuthSession.getRedirectUrl();
  const query = qs.stringify({
    state: crypto.lib.WordArray.random(16).toString(),
    redirect_uri: redirectUrl
  });
  const authUrl = `${"http://localhost:9000"}/authorize?${query}`;
  const result = await AuthSession.startAsync({ authUrl });

  // TODO: Error handling
  if (result.type === "success") {
    const {
      params: { access_token }
    } = result;

    return fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then(res => res.json())
      .then(({ avatar_url, login }) =>
        dispatch(
          creators.setCredential({
            accessToken: access_token,
            avatarUrl: avatar_url,
            displayName: login
          })
        )
      )
      .catch(() => {
        // TODO: Error handling
      });
  }
};
