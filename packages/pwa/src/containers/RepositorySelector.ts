import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RepositorySelector } from "@codeglide/components";
import { Repository } from "@codeglide/domain";
import { history } from "../history";
import { searchParams } from "../modules";
import { searchRepository } from "../selectors";
import { State } from "../store";
import { searchRepositories } from "../usecases/searchRepositories";

const mapStateToProps = (state: State) => ({
  repositories: searchRepository.sortByStargazer(state),
  loading: searchRepository.inFetching(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRequestBack() {
    history.goBack();
  },
  onChange(repository: Repository) {
    dispatch(searchRepositories(repository));
  },
  onSelect(repository: Repository) {
    dispatch(searchParams.creators.setRepository(repository));
    history.goBack();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositorySelector);
