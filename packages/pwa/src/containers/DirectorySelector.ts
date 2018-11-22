import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  DirectorySelector,
  DirectorySelectorProps
} from "@codeglide/components";
import { Repository, TreeEntry } from "@codeglide/domain";
import { history } from "../history";
import { State } from "../store";
import { searchParams } from "../modules";
import { searchDirectory } from "../selectors";
import { listFiles } from "../usecases/listFiles";
import { FunctionProperties, NonFunctionProperties } from "../types";

const mapStateToProps = (
  state: State,
  ownProps: { match: any } // FIXME: Typing
): NonFunctionProperties<DirectorySelectorProps> => {
  const { owner, repo } = ownProps.match.params;
  return {
    tree: searchDirectory.sortByAlphabetical(state),
    paths: searchDirectory.getPaths(state),
    _: console.log(searchDirectory.getPaths(state)),
    repository: { owner, repository: repo },
    loading: searchDirectory.inFetching(state)
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): FunctionProperties<DirectorySelectorProps> => ({
  onSelect(_: Repository, entry: TreeEntry) {
    dispatch(searchParams.creators.setDirectory(entry.path));
    history.goBack();
  },
  onRequestMore(repository: Repository, entry: TreeEntry) {
    dispatch(listFiles(repository, entry.path));
  },
  onRequestPath(repository: Repository, path: string) {
    dispatch(listFiles(repository, path));
  },
  onRequestBack() {
    history.goBack();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectorySelector);
