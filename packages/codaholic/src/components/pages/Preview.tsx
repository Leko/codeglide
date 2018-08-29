import React from "react";
import { Component } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
import {
  NavigationScreenOptions,
  NavigationScreenProp
} from "react-navigation";
import { View } from "@shoutem/ui";
import Button from "../molecules/Button";
import Container from "../molecules/Container";

type Params = {
  repository: string; // owner/repo
  path: string;
  highlights: string; // Comma separated. It's convenience for DeepLink
};
type Props = {
  navigation: NavigationScreenProp<Params>;
  contents: string;
  loadContents: (location: { repository: string; path: string }) => any;
};

class Preview extends Component<Props> {
  componentDidMount() {
    // FIXME: recompose
    const { navigation, loadContents } = this.props;

    const { repository, path } = navigation.state.params;
    loadContents({ repository, path });
  }

  render() {
    const { navigation, contents } = this.props;
    const { path } = navigation.state.params ? navigation.state.params : {};
    if (!contents) {
      return (
        <Container>
          <ActivityIndicator size="small" />
        </Container>
      );
    }

    return (
      <SyntaxHighlighter
        // showLineNumbers not working on RN-syntax-highlight. It uses span
        showLineNumbers={false}
        language="javascript"
        style={atomOneDark}
        highlighter="hljs"
      >
        {contents}
      </SyntaxHighlighter>
    );
  }
}

const navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<Params>;
}): NavigationScreenOptions => {
  const { path } = navigation.state.params || { path: "" };
  return {
    title: path,
    headerLeft: () => (
      <Button
        styleName="icon"
        icon="chevron-left"
        onPress={() => navigation.goBack()}
      />
    )
  };
};

export default Object.assign(Preview, { navigationOptions });
