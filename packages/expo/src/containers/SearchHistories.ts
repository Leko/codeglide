import { connect } from "react-redux";
import { State } from "../modules/state";
import SearchHistories from "../components/pages/SearchHistories";
import { creators, selectors } from "../modules/searchHistory";
import { History } from "../modules/searchHistory/state";

const mapStateToProps = (state: State) => ({
  histories: selectors.getLRUHistories(state)
});
const mapDispatchToProps = (dispatch: any) => ({
  removeHistory(history: History) {
    dispatch(creators.destroy(history.digest));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHistories);
