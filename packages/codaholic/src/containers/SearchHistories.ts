import { connect } from "react-redux";
import { State } from "../modules/state";
import SearchHistories from "../components/pages/SearchHistories";
import { selectors as searchHistorySelectors } from "../modules/searchHistory";

const mapStateToProps = (state: State) => ({
  histories: searchHistorySelectors.getLRUHistories(state)
});
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHistories);
