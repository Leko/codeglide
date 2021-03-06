import { Dispatch } from "redux";
import { connect } from "react-redux";
import { CodeSearch, CodeSearchProps } from "@codeglide/components";
import {
  SearchParamsState,
  Repository,
  CodeSearchResultItem
} from "@codeglide/domain";
import { Language } from "@codeglide/languages";
import { history } from "../history";
import { State } from "../store";
import { searchCode } from "../usecases/searchCode";
import { searchCode as searchCodeSelectors } from "../selectors";
import { FunctionProperties, NonFunctionProperties } from "../types";

const mapStateToProps = (
  state: State
): NonFunctionProperties<CodeSearchProps> => ({
  defaultValue: state.searchParams,
  results: searchCodeSelectors.getResults(state),
  searching: searchCodeSelectors.isBusy(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch
): FunctionProperties<CodeSearchProps> => ({
  onRequestBack() {
    history.goBack();
  },
  onPressSearchResult(params: CodeSearchResultItem) {
    const sha = new URLSearchParams(params.url.split("?")[1]).get("ref");
    history.push(`/blob/${sha}/${params.repository.full_name}/${params.path}`);
  },
  onRequestChooseRepository(repository?: Repository) {
    history.push("/search/repositories", {
      // TODO: Get form values
      defaultValue: ""
    });
  },
  onRequestChooseDirectory(repository: Repository) {
    history.push(
      `/search/directories/${repository.owner}/${repository.repository}/`
    );
  },
  onRequestChooseLanguage(language?: Language) {
    history.push("/search/languages", {
      defaultValue: ""
    });
  },
  onSubmit(values: SearchParamsState) {
    dispatch(searchCode(values));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeSearch);
