import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ReadOnlyEditor, ReadOnlyEditorProps } from "@codeglide/components";
import { history } from "../history";
import { State } from "../store";
import { FunctionProperties, NonFunctionProperties } from "../types";

const mapStateToProps = (
  state: State
): NonFunctionProperties<ReadOnlyEditorProps> => ({
  value: ""
});

const mapDispatchToProps = (
  dispatch: Dispatch
): FunctionProperties<ReadOnlyEditorProps> => ({
  onRequestBack() {
    history.goBack();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadOnlyEditor);
