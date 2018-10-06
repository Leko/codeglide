import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";

export default class Editor extends Component {
  editorDidMount = (editor, monaco) => {
    // Disable to show keyboard
    document.querySelector(".inputarea").setAttribute("disabled", true);
  };

  render() {
    const { width, height, value, language } = this.props;
    const options = {
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
    return (
      <MonacoEditor
        theme="vs-dark"
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
