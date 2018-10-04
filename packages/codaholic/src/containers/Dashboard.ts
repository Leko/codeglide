import { connect } from "react-redux";
import { State } from "../modules/state";
import Dashboard from "../components/pages/Dashboard";
import { searchCode } from "../usecases";
import { SearchParams } from "../usecases/searchCode";
import {
  creators,
  selectors as codeSearchSelectors
} from "../modules/codeSearch";
import { selectors as searchHistorySelectors } from "../modules/searchHistory";

const mapStateToProps = (state: State) => ({
  searched: codeSearchSelectors.isSearched(state),
  busy: codeSearchSelectors.isBusy(state),
  total: codeSearchSelectors.getTotal(state),
  current: codeSearchSelectors.getCurrent(state),
  results: codeSearchSelectors.getResults(state),
  histories: searchHistorySelectors.getLRUHistories(state)
});
const mapDispatchToProps = (dispatch: any) => ({
  search(params: SearchParams) {
    dispatch(searchCode(params));
  },
  onRequestClear() {
    dispatch(creators.clear());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
