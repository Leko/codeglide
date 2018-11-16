import * as React from "react";
import { editor } from "monaco-editor";
import MonacoEditor, {
  MonacoEditorProps,
  EditorDidMount
} from "react-monaco-editor";

export type Props = {
  /**
   * Width of editor
   * @default 100%
   */
  width?: MonacoEditorProps["width"];

  /**
   * Height of editor
   * @default 500
   */
  height?: MonacoEditorProps["height"];

  /**
   * Theme to be used for rendering.
   * The current out-of-the-box available themes are: 'vs', 'vs-dark', 'hc-black'.
   * @default vs-dark
   */
  theme?: editor.BuiltinTheme;

  value: MonacoEditorProps["value"];
  language: MonacoEditorProps["language"]; // FIXME: Make enum

  /**
   * An event emitted when the editor has been mounted
   * @default () => {}
   */
  editorDidMount: EditorDidMount;
};

export class ReadOnlyEditor extends React.Component<Props> {
  public static defaultProps = {
    theme: "vs-dark",
    editorDidMount: () => {}
  };

  editorDidMount: EditorDidMount = (editor, monaco) => {
    const { editorDidMount } = this.props;
    // Disable to show keyboard
    const inputarea = document.querySelector(".inputarea");
    if (!inputarea) {
      throw new Error("Could not find selector: .inputarea");
    }
    inputarea.setAttribute("disabled", "true");

    editorDidMount(editor, monaco);
  };

  getOption(): editor.IEditorConstructionOptions {
    return {
      readOnly: true,
      renderControlCharacters: true,
      renderWhitespace: "boundary",
      minimap: {
        enabled: false
      },
      showFoldingControls: "always",
      showUnused: true,
      lineNumbersMinChars: 3,
      selectOnLineNumbers: true
    };
  }

  render() {
    const { width, height, value, language, theme } = this.props;
    const options = this.getOption();
    return (
      <MonacoEditor
        theme={theme}
        width={width}
        height={height}
        language={language}
        value={value}
        options={options}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}
