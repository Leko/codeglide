import React, { PureComponent, SyntheticEvent } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  ScrollViewProps
} from "react-native";
import RNSyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
import HighlightWords from "./HighlightWords";

type Props = {
  children: string;
};
type State = {
  scrollTop: number;
};

const fontSize = 12;
const fontFamily = Platform.OS === "ios" ? "Menlo-Regular" : "monospace";
const backgroundColor = atomOneDark.hljs.background;
const padding = Number(atomOneDark.hljs.padding.replace("em", "")) * 16;

atomOneDark.hljs.background = "transparent";

export default class SyntaxHighlighter extends PureComponent<Props> {
  shadowScrollView: ScrollView | null = null;
  state: State = {
    scrollTop: 0
  };

  handleScroll = ({
    nativeEvent: {
      contentOffset: { y }
    }
  }: SyntheticEvent<ScrollView>) => {
    if (!this.shadowScrollView) {
      return;
    }
    this.shadowScrollView.scrollTo({ x: 0, y: y, animated: false });
  };

  handleRef = (ref: ScrollView) => {
    this.shadowScrollView = ref;
  };

  renderCodeContainer = (props: ScrollViewProps) => {
    return (
      <ScrollView {...props} scrollEventThrottle={16} horizontal={false} />
    );
  };

  render() {
    const { children } = this.props;
    const { scrollTop } = this.state;

    return (
      <ScrollView horizontal directionalLockEnabled style={{ backgroundColor }}>
        <View style={styles.flexible}>
          <ScrollView
            ref={this.handleRef}
            style={[
              styles.shadowContainer,
              {
                top: -scrollTop
              }
            ]}
          >
            <HighlightWords
              style={{
                textStyle: {
                  fontSize,
                  fontFamily,
                  lineHeight: 17,
                  color: "transparent"
                },
                highlightStyle: {
                  color: "transparent"
                }
              }}
              words={["hothouse"]}
            >
              {children}
            </HighlightWords>
          </ScrollView>
          <RNSyntaxHighlighter
            // showLineNumbers not working on RN-syntax-highlight. It uses span
            showLineNumbers={false}
            fontSize={fontSize}
            fontFamily={fontFamily}
            style={atomOneDark}
            highlighter="hljs"
            PreTag={this.renderCodeContainer}
            onScroll={this.handleScroll}
          >
            {children}
          </RNSyntaxHighlighter>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  flexible: {
    flex: 1
  },
  shadowContainer: {
    position: "absolute",
    padding,
    paddingTop: padding - 1.5
  }
});
