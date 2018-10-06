import React, { Component } from "react";
import Editor from "./Editor";

const value = `
// type your code...
const hoge = 2

const foo = (some) => (unused) => (variables) => () => () => () => () => () => () => () => () => () => () => () => () => () => {
  return hoge + 1
}

foo()
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Editor
          value={value}
          language="typescript"
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    );
  }
}

export default App;
