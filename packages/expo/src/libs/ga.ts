import { Analytics, ScreenHit, Event } from "expo-analytics";
import { GA_TRACKING_CODE } from "../env";

const analytics = new Analytics(GA_TRACKING_CODE, null, { debug: __DEV__ });
const nope = () => {};

export const trackScreenView = (screenName: string): Promise<void> => {
  return analytics.hit(new ScreenHit(screenName)).catch(nope);
};

export const trackEvent = (
  name: string,
  action: string,
  params: { label?: string; value?: number } = {}
): Promise<void> => {
  return analytics
    .event(new Event(name, action, params.label, params.value))
    .catch(nope);
};
