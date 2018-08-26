import { createAggregate } from "redux-aggregate";
import { getInitialState } from "./state";
import { mutations } from "./mutations";
import * as selectors from "./selectors";

export { Result, State } from "./state";

export const { types, creators, reducerFactory } = createAggregate(
  mutations,
  "user/"
);

export { selectors };

export default reducerFactory(getInitialState());
