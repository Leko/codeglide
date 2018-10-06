if (!process.env.GA_TRACKING_CODE)
  throw new Error("Environment variable `GA_TRACKING_CODE` must be required");
if (!process.env.GITHUB_AUTHORIZE_URL)
  throw new Error(
    "Environment variable `GITHUB_AUTHORIZE_URL` must be required"
  );
if (!process.env.GITHUB_CALLBACK_URL)
  throw new Error(
    "Environment variable `GITHUB_CALLBACK_URL` must be required"
  );

export const GA_TRACKING_CODE: string = process.env.GA_TRACKING_CODE;
export const GITHUB_AUTHORIZE_URL: string = process.env.GITHUB_AUTHORIZE_URL;
export const GITHUB_CALLBACK_URL: string = process.env.GITHUB_CALLBACK_URL;
