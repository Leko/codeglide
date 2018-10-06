import { createAggregate } from "redux-aggregate";
import { getInitialState, Namespace } from "./state";
import * as mutations from "./mutations";
import * as selectors from "./selectors";

export { Result, State } from "./state";

export const { types, creators, reducerFactory } = createAggregate(
  mutations,
  `${Namespace}/`
);

export { selectors };

export default reducerFactory(getInitialState());
