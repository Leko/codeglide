import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Routes } from "./routes";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Routes />
        </div>
      </Provider>
    );
  }
}

export default App;
