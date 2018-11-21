import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Repository } from "@codeglide/domain";
import { CodeView, CodeViewProps } from "@codeglide/components";
import { history } from "../history";
import { State } from "../store";
import { codeView } from "../selectors";
import { fetchCode } from "../usecases/fetchCode";
import { FunctionProperties, NonFunctionProperties } from "../types";

const mapStateToProps = (
  state: State,
  ownProps: { match: any } // FIXME: Typing
): NonFunctionProperties<CodeViewProps> => ({
  repository: {
    owner: ownProps.match.params.owner,
    repository: ownProps.match.params.repository
  },
  sha: ownProps.match.params.sha,
  path:
    ownProps.match.params.paths
      .split("/")
      .slice(0, -1)
      .join("/") || null,
  filename: ownProps.match.params.paths.split("/").slice(-1)[0],
  code: codeView.getContent(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch
): FunctionProperties<CodeViewProps> => ({
  onRequestBack() {
    history.goBack();
  },
  onRequestLoad(repository: Repository, sha: string, fullpath: string) {
    dispatch(fetchCode(repository, sha, fullpath));
  },
  onRequestPath(path: string) {
    console.log("TODO: Open directory list", path);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeView);
