import { Dispatch } from "redux";
import { connect } from "react-redux";
import { LanguageSelector, LanguageSelectorProps } from "@codeglide/components";
import { languages, Language } from "@codeglide/languages";
import { history } from "../history";
import { State } from "../store";
import { searchParams } from "../modules";
import { FunctionProperties, NonFunctionProperties } from "../types";

const mapStateToProps = (
  state: State
): NonFunctionProperties<LanguageSelectorProps> => ({
  languages
});

const mapDispatchToProps = (
  dispatch: Dispatch
): FunctionProperties<LanguageSelectorProps> => ({
  onSelect(language: Language) {
    dispatch(searchParams.creators.setLanguageName(language.name));
    history.goBack();
  },
  onRequestBack() {
    history.goBack();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelector);
