import { connect } from "react-redux";
import { State } from "../modules/state";
import Preview from "../components/pages/Preview";
import { selectors } from "../modules/file";
import { loadContents } from "../usecases";

const mapStateToProps = (state: State) => ({
  contents: selectors.getContents(state)
});
const mapDispatchToProps = (dispatch: any) => ({
  loadContents({ repository, path }: { repository: string; path: string }) {
    dispatch(loadContents({ repository, path }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
