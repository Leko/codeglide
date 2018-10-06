import { Store } from "redux";
import { Linking } from "react-native";
import { State } from "../modules/state";
import { OPEN_IN_BROWSER } from "../modules/deepLink";

export default (store: Store<State>) => next => async action => {
  switch (action.type) {
    case OPEN_IN_BROWSER:
      if (!(await Linking.canOpenURL(action.url))) {
        // TODO: Sentry
        throw new Error(`Cannot open URL: ${action.url}`);
      }
      try {
        await Linking.openURL(action.url);
      } catch (e) {
        // TODO: Sentry
        throw e;
      }
  }
  return next(action);
};
