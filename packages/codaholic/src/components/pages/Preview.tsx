import React from "react";
import { Component } from "react";
import { ActivityIndicator } from "react-native";
import {
  NavigationScreenOptions,
  NavigationScreenProp
} from "react-navigation";
import { View } from "@shoutem/ui";
import SyntaxHighlighter from "../atoms/SyntaxHighlighter";
import { occurrence } from "../../libs/occurrence";
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

  handleClear = () => {
    // TODO: Clear highlights
  };

  handlePrev = () => {
    // TODO: Move focus to prev matched text
  };

  handleNext = () => {
    // TODO: Move focus to next matched text
  };

  render() {
    const { navigation, contents } = this.props;
    if (!contents) {
      return (
        <Container>
          <ActivityIndicator size="small" />
        </Container>
      );
    }

    const { highlights } = navigation.state.params || { highlights: "" };
    const highlightWords = highlights.split(",").filter(Boolean);
    const count = highlightWords.map((word: string) =>
      occurrence(contents, word)
    );
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <SyntaxHighlighter
            highlightWords={highlightWords}
            highlightCount={count}
          >
            {contents}
          </SyntaxHighlighter>
        </View>
      </View>
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
