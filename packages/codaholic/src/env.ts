import { Constants } from "expo";

type Environment = {
  SCHEME: string;
  GA_TRACKING_CODE: string;
  AUTH0_DOMAIN: string;
  AUTH0_CLIENT_ID: string;
};

const SCHEME = "jp.leko.codaholic";

const envs: {
  development: Environment;
  production: Environment;
} = {
  development: {
    SCHEME,
    GA_TRACKING_CODE: "XXX-XXXXX",
    AUTH0_CLIENT_ID: "-QRtZBIbhuI2s-d_ePtI1dj0pYHBru9m",
    AUTH0_DOMAIN: "https://codaholic.auth0.com"
  },
  production: {
    SCHEME,
    GA_TRACKING_CODE: "UA-125972641-1",
    AUTH0_CLIENT_ID: "",
    AUTH0_DOMAIN: ""
  }
};

const type =
  Constants.manifest.releaseChannel !== "production"
    ? "development"
    : "production";

export default envs[type];
