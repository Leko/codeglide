import "./self-polyfill";
import React, { PureComponent } from "react";
import {
  View,
  StatusBar,
  AppState,
  AppStateStatus,
  Clipboard
} from "react-native";
import { Provider } from "react-redux";
import { Font, AppLoading } from "expo";
import Sentry from "sentry-expo";
import { PersistGate } from "redux-persist/integration/react";
import { StyleProvider } from "@shoutem/theme";
import { darkTheme } from "./theme";
import Routes from "./routes";
import { createStore } from "./modules";
import { dismissClipboardSuggestion, suggestFromClipboard } from "./usecases";
import StatusBar from "./components/atoms/StatusBar";
import ClipboardSuggestion from "./containers/ClipboardSuggestion";

Sentry.config(
  "https://3bd3d5cdf75f4990a92a43bbfa729f96@sentry.io/1265008"
).install();

const { store, persistor } = createStore();

type State = {
  fontsAreLoaded: boolean;
};

export default class App extends PureComponent<void, State> {
  state = { fontsAreLoaded: false };

  // > If you are using Expo, see this project for example usage. Otherwise, follow the steps below.
  // > [shoutem/ui: Customizable set of components for React Native applications](https://github.com/shoutem/ui#examples-component)
  async componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);

    await Font.loadAsync({
      "Rubik-Black": require("@shoutem/ui/fonts/Rubik-Black.ttf"),
      "Rubik-BlackItalic": require("@shoutem/ui/fonts/Rubik-BlackItalic.ttf"),
      "Rubik-Bold": require("@shoutem/ui/fonts/Rubik-Bold.ttf"),
      "Rubik-BoldItalic": require("@shoutem/ui/fonts/Rubik-BoldItalic.ttf"),
      "Rubik-Italic": require("@shoutem/ui/fonts/Rubik-Italic.ttf"),
      "Rubik-Light": require("@shoutem/ui/fonts/Rubik-Light.ttf"),
      "Rubik-LightItalic": require("@shoutem/ui/fonts/Rubik-LightItalic.ttf"),
      "Rubik-Medium": require("@shoutem/ui/fonts/Rubik-Medium.ttf"),
      "Rubik-MediumItalic": require("@shoutem/ui/fonts/Rubik-MediumItalic.ttf"),
      "Rubik-Regular": require("@shoutem/ui/fonts/Rubik-Regular.ttf"),
      "rubicon-icon-font": require("@shoutem/ui/fonts/rubicon-icon-font.ttf")
    });

    this.setState({ fontsAreLoaded: true });
    this.checkClipboard();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = (appState: AppStateStatus) => {
    if (appState !== "active") {
      store.dispatch(dismissClipboardSuggestion());
      return;
    }

    this.checkClipboard();
  };

  async checkClipboard() {
    const clipboardText = await Clipboard.getString();
    store.dispatch(suggestFromClipboard(clipboardText));
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StyleProvider style={darkTheme}>
            <View style={{ flex: 1 }}>
              <StatusBar barStyle="light-content" />
              <ClipboardSuggestion />
              <Routes />
            </View>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}
