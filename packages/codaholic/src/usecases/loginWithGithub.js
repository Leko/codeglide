import { AuthSession } from "expo";
import qs from "query-string";
import env from "../env";
import { creators } from "../modules/user";

export default () => async dispatch => {
  const redirectUrl = AuthSession.getRedirectUrl();
  const query = qs.stringify({
    connection: "github",
    response_type: "token",
    scope: ["public_repo"].join(" "),
    client_id: env.AUTH0_CLIENT_ID,
    redirect_uri: redirectUrl
  });
  const result = await AuthSession.startAsync({
    authUrl: `${env.AUTH0_DOMAIN}/authorize?${query}`
  });

  // TODO: Error handling
  console.log({ redirectUrl, result });
  if (result.type === "success") {
    const {
      params: { access_token }
    } = result;
    dispatch(creators.setCredential(access_token));
  }
};
