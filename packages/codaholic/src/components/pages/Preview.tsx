import React from "react";
import { Component } from "react";
import {
  NavigationScreenOptions,
  NavigationScreenProp
} from "react-navigation";
import { View } from "@shoutem/ui";
import sumBy from "lodash/sumBy";
import SyntaxHighlighter from "../atoms/SyntaxHighlighter";
import * as Placeholder from "../atoms/Placeholder";
import { occurrence } from "../../libs/occurrence";
import Button from "../molecules/Button";

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

  handleChangeHighlightWords = (words: Array<string>) => {
    const { navigation } = this.props;
    navigation.setParams({ highlights: words.join(",") });
  };

  render() {
    const { navigation, contents } = this.props;
    if (!contents) {
      return (
        <View style={{ flex: 1, padding: 10 }}>
          <Placeholder.Paragraph
            lineNumber={15}
            lineSpacing={3}
            firstLineWidth="20%"
            lastLineWidth="50%"
          />
        </View>
      );
    }

    const { highlights } = navigation.state.params || { highlights: "" };
    const highlightWords = highlights.split(",").filter(Boolean);
    const count = sumBy(highlightWords, (word: string) =>
      occurrence(contents, word)
    );
    return (
      <View style={{ flex: 1 }}>
        <SyntaxHighlighter
          highlightWords={highlightWords}
          highlightCount={count}
          onChangeHighlightWords={this.handleChangeHighlightWords}
        >
          {contents}
        </SyntaxHighlighter>
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
