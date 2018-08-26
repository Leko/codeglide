import { connect } from "react-redux";
import { State } from "../modules/state";
import Dashboard from "../components/pages/Dashboard";
import { searchCode } from "../usecases";
import { SearchParams } from "../usecases/searchCode";
import { selectors } from "../modules/codeSearch";

const mapStateToProps = (state: State) => ({
  busy: selectors.isBusy(state),
  total: selectors.getTotal(state),
  current: selectors.getCurrent(state),
  results: selectors.getResults(state)
});
const mapDispatchToProps = (dispatch: any) => ({
  search(params: SearchParams) {
    dispatch(searchCode(params));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
