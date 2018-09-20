import { Constants } from "expo";

type Environment = {
  SCHEME: string;
  GA_TRACKING_CODE: string;
  AUTH_DOMAIN: string;
};

const SCHEME = "jp.leko.codaholic";

const envs: {
  development: Environment;
  production: Environment;
} = {
  development: {
    SCHEME,
    GA_TRACKING_CODE: "XXX-XXXXX",
    AUTH_DOMAIN: "http://localhost:9000"
  },
  production: {
    SCHEME,
    GA_TRACKING_CODE: "UA-125972641-1",
    AUTH_DOMAIN: ""
  }
};

const type =
  Constants.manifest.releaseChannel !== "production"
    ? "development"
    : "production";

export default envs[type];
