import React from "react";
import { Component } from "react";
import {
  NavigationScreenOptions,
  NavigationScreenProp
} from "react-navigation";
import { View } from "@shoutem/ui";
import CodePreview from "../organisms/CodePreview";
import * as Placeholder from "../atoms/Placeholder";
import { occurrences } from "../../libs/occurrence";
import Button from "../molecules/Button";
import * as analytics from "../../libs/ga";

type Params = {
  repository: string; // owner/repo
  path: string;
  highlights: string; // Comma separated. It's convenience for DeepLink
};
type Props = {
  navigation: NavigationScreenProp<Params>;
  contents: string;
  loadContents: (location: { repository: string; path: string }) => any;
  onRequestSuggeestion: (token: string) => any;
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
    analytics.trackEvent("preview", "highlight", { label: words.join(",") });
  };

  handleLongPress = (text: string) => {
    this.props.onRequestSuggeestion(text);
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
    const count = occurrences(contents, highlightWords);
    return (
      <View style={{ flex: 1 }}>
        <CodePreview
          highlightWords={highlightWords}
          highlightCount={count}
          onChangeHighlightWords={this.handleChangeHighlightWords}
          onLongPress={this.handleLongPress}
        >
          {contents}
        </CodePreview>
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
