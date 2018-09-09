import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
import FocusWords, {
  FocusWords as FocusWordsType,
  Position
} from "../molecules/FocusWords";
import { Text } from "../atoms/Text";
import Divider from "../atoms/Divider";
import { SyntaxHighlighter } from "../atoms/SyntaxHighlighter";
import Row from "../molecules/Row";
import Button from "../molecules/Button";
import SearchBar from "../organisms/SearchBar";
import KeyboardSpacer from "../organisms/KeyboardSpacer";
import { ScrollAdjuster } from "../../libs/ScrollAdjuster";

type Props = {
  children: string;
  highlightWords: Array<string>;
  highlightCount: number;
  onChangeHighlightWords: (words: Array<string>) => any;
};
type State = {
  cursor: number;
};

const fontSize = 12;
const fontFamily = Platform.OS === "ios" ? "Menlo-Regular" : "monospace";
const backgroundColor = atomOneDark.hljs.background;
const padding = Number(atomOneDark.hljs.padding.replace("em", "")) * 16;

atomOneDark.hljs.background = "transparent";

export default class CodePreview extends PureComponent<Props> {
  wholeScrollPosition: { top: number; left: number } = { top: 0, left: 0 };
  wholeScrollViewSize: { width: number; height: number } = {
    width: -1,
    height: -1
  };
  wholeScrollViewportSize: { width: number; height: number } = {
    width: -1,
    height: -1
  };
  horizontalScrollViewRef: ScrollView | null = null;
  verticalScrollViewRef: ScrollView | null = null;
  shadowScrollViewRef: ScrollView | null = null;
  focusWordsRef: FocusWordsType | null = null;
  state: State = {
    cursor: 0
  };

  scrollToPosition({ width, height, x, y }: Position) {
    const adjuster = new ScrollAdjuster({
      scrollTop: this.wholeScrollPosition.top,
      scrollLeft: this.wholeScrollPosition.left,
      screenWidth: this.wholeScrollViewportSize.width,
      screenHeight: this.wholeScrollViewportSize.height,
      padding: 20
    });

    const { top, left } = adjuster.getMovingDistance({
      width,
      height,
      x,
      y: y
    });
    this.wholeScrollPosition = {
      top: this.wholeScrollPosition.top + top,
      left: this.wholeScrollPosition.left + left
    };

    if (left > 0 && this.horizontalScrollViewRef) {
      this.horizontalScrollViewRef.scrollTo({
        x: this.wholeScrollPosition.left,
        animated: true
      });
    }
    if (top > 0 && this.verticalScrollViewRef) {
      this.verticalScrollViewRef.scrollTo({
        y: this.wholeScrollPosition.top,
        animated: true
      });
    }
  }

  focusOnCursor = () => {
    if (!this.focusWordsRef || this.props.highlightCount === 0) {
      return;
    }

    const pos = this.focusWordsRef.getPosition(this.state.cursor);
    this.scrollToPosition(pos);
  };

  handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent> | undefined) => {
    if (!e || !this.shadowScrollViewRef) {
      return;
    }

    const {
      nativeEvent: {
        contentOffset: { y }
      }
    } = e;
    this.wholeScrollPosition.top = y;
    this.shadowScrollViewRef.scrollTo({ x: 0, y: y, animated: false });
  };

  handleShadowScrollView = (ref: ScrollView) => {
    this.shadowScrollViewRef = ref;
  };

  handleChangeHighlightWord = (text: string) => {
    this.props.onChangeHighlightWords(text.split(","));
  };
  handleClearHighlightWord = () => {
    this.props.onChangeHighlightWords([]);
  };

  handlePrev = () => {
    if (!this.focusWordsRef) {
      return;
    }
    const newCursor = Math.max(0, this.state.cursor - 1);
    this.setState(
      {
        cursor: newCursor
      },
      this.focusOnCursor
    );
  };

  handleNext = () => {
    if (!this.focusWordsRef) {
      return;
    }
    const { highlightCount } = this.props;
    const newCursor = Math.min(highlightCount - 1, this.state.cursor + 1);
    this.setState(
      {
        cursor: newCursor
      },
      this.focusOnCursor
    );
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.highlightWords !== prevProps.highlightWords) {
      this.setState({
        cursor: 0
      });
    }
  }

  renderCodeContainer = (props: ScrollViewProps) => {
    return (
      <ScrollView
        {...props}
        ref={ref => {
          this.verticalScrollViewRef = ref;
        }}
        scrollEventThrottle={1000 / 60}
        horizontal={false}
        onScroll={this.handleScroll}
      />
    );
  };

  render() {
    const { children, highlightWords, highlightCount } = this.props;
    const { cursor } = this.state;

    return (
      <View style={styles.flexible}>
        <ScrollView
          ref={ref => {
            this.horizontalScrollViewRef = ref;
          }}
          horizontal
          directionalLockEnabled
          style={{ backgroundColor }}
          onLayout={e => {
            const { width, height } = e.nativeEvent.layout;
            this.wholeScrollViewportSize = { width, height };
          }}
          scrollEventThrottle={1000 / 60}
          onScroll={e => {
            if (!e) {
              return;
            }
            this.wholeScrollPosition.left = e.nativeEvent.contentOffset.x;
          }}
        >
          <View style={styles.flexible}>
            <ScrollView
              ref={this.handleShadowScrollView}
              style={styles.shadowContainer}
              onLayout={e => {
                const { width, height } = e.nativeEvent.layout;
                this.wholeScrollViewSize = { width, height };
              }}
            >
              <FocusWords
                ref={ref => {
                  if (!ref) {
                    return;
                  }
                  this.focusWordsRef = ref.wrappedInstance;
                }}
                onLayoutReady={this.focusOnCursor}
                style={{
                  textStyle: {
                    fontSize,
                    fontFamily,
                    lineHeight: 17,
                    color: "transparent"
                  },
                  highlightStyle: {
                    color: "transparent"
                  },
                  focusStyle: {
                    color: "transparent"
                  }
                }}
                words={highlightWords}
                cursor={cursor}
              >
                {children}
              </FocusWords>
            </ScrollView>
            <SyntaxHighlighter
              lineHeight={17}
              fontSize={fontSize}
              fontFamily={fontFamily}
              theme={atomOneDark}
              onScroll={this.handleScroll}
              scrollEventThrottle={1000 / 60}
              scrollViewRef={ref => {
                this.verticalScrollViewRef = ref;
              }}
            >
              {children}
            </SyntaxHighlighter>
          </View>
        </ScrollView>
        <View>
          <Divider styleName="thin dent" />
          <Row>
            <View style={styles.flexible}>
              <SearchBar
                searchIcon={null}
                placeholder="Search text (comma separated)"
                defaultValue={highlightWords.join(",")}
                returnKeyType="search"
                onChangeText={this.handleChangeHighlightWord}
                onClear={this.handleClearHighlightWord}
              />
            </View>
            <Text>
              {highlightCount > 0 ? cursor + 1 : 0} of {highlightCount}
            </Text>
            <Button
              disabled={highlightCount === 0 || cursor === 0}
              icon="keyboard-arrow-up"
              styleName="icon slim"
              onPress={this.handlePrev}
            />
            <View style={{ marginRight: 8 }}>
              <Button
                disabled={highlightCount === 0 || highlightCount === cursor + 1}
                icon="keyboard-arrow-down"
                styleName="icon slim"
                onPress={this.handleNext}
              />
            </View>
          </Row>
          <KeyboardSpacer />
        </View>
      </View>
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
