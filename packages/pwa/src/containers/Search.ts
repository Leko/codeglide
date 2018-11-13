import { connect } from "react-redux";
import { CodeSearch, CodeSearchProps } from "@codeglide/components";
import { SearchParamsState, Repository } from "@codeglide/domain";
import { Language } from "@codeglide/languages";
import { history } from "../history";
import { State } from "../store";
import { FunctionProperties, NonFunctionProperties } from "../types";

const mapStateToProps = (
  state: State
): NonFunctionProperties<CodeSearchProps> => ({
  _: console.log(state.searchParams),
  // defaultValue: state.searchParams
  defaultValue: {
    ...state.searchParams,
    repo: { owner: "Leko", repository: "reinbox" }
  }
});

const mapDispatchToProps = (): FunctionProperties<CodeSearchProps> => ({
  onRequestBack() {
    history.goBack();
  },
  onPressSearchResult() {
    // history.();
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
    console.log("TODO: Implement search", values);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeSearch);
