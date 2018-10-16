import * as React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Routes } from "./routes";

const store = createStore(state => state);

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
