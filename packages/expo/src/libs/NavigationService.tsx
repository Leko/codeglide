import {
  NavigationActions,
  NavigationAction,
  NavigationComponent
} from "react-navigation";

let navigator: NavigationComponent;

const dispatch = (action: NavigationAction): void => {
  if (!navigator) {
    throw new Error("Bad usage: navigator must not be null");
  }
  navigator.dispatch(action);
};

export const set = (n: NavigationComponent): void => {
  navigator = n;
};

export const navigate = (routeName: string, params: Object) => {
  dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};
