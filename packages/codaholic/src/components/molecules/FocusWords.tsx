import * as React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { findAll } from "highlight-words-core";
import { connectStyle } from "@shoutem/theme";

type MatchedChunk = {
  start: number;
  end: number;
  highlight: boolean;
};

type MatchedText = {
  key: string;
  text: string;
  highlight: boolean;
  focus: boolean;
  cursor: number;
};

export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface IStyle {
  textStyle: {
    lineHeight: number;
  };
  highlightStyle: Object;
  focusStyle: Object;
}

type Props = {
  style: IStyle;
  words: Array<string>;
  children: string;
  cursor: number;
  onLayoutReady: () => any;
};

const getMatches = (
  text: string,
  words: Array<string>
): Array<MatchedChunk> => {
  return findAll({
    textToHighlight: text,
    searchWords: words,
    autoEscape: true
  });
};

const lexer = (
  text: string,
  words: Array<string>,
  focusIndex: number
): Array<Array<MatchedText>> => {
  let counter = -1;
  return text.split("\n").map(line =>
    getMatches(line, words).map(
      ({ start, end, highlight }: MatchedChunk): MatchedText => {
        if (highlight) {
          counter += 1;
        }
        const token = line.substr(start, end - start);
        const focus = highlight && counter === focusIndex;
        return {
          highlight,
          focus,
          key: `${start}-${end}-${token}`,
          text: token,
          cursor: highlight ? counter : -1
        };
      }
    )
  );
};

export class FocusWords extends React.PureComponent<Props> {
  highlightPositions: Array<Position>;

  constructor(props: Props) {
    super(props);
    this.highlightPositions = [];
  }

  getPosition(cursor: number): Position {
    if (!this.highlightPositions[cursor]) {
      throw new Error(`Cannot find cursor: ${cursor}`);
    }
    return this.highlightPositions[cursor];
  }

  componentWillUpdate(nextProps: Props) {
    if (nextProps.words !== this.props.words) {
      this.highlightPositions = [];
    }
  }

  renderLine = ({
    item: matches,
    index: lineNumber
  }: {
    item: Array<MatchedText>;
    index: number;
  }) => {
    const { style } = this.props;
    const lineHeight = style.textStyle.lineHeight;

    return (
      <View style={[styles.row, { height: lineHeight }]}>
        {matches.map(({ key, text, highlight, focus, cursor }: MatchedText) => {
          if (!highlight) {
            return (
              <Text key={key} style={style && style.textStyle}>
                {text}
              </Text>
            );
          }

          return (
            <Text
              key={key}
              onLayout={e => {
                const { x, width, height } = e.nativeEvent.layout;
                this.highlightPositions[cursor] = {
                  y: lineNumber * lineHeight,
                  x,
                  width,
                  height
                };
                if (focus) {
                  // FIXME: Flaky
                  setTimeout(() => {
                    this.props.onLayoutReady();
                  }, 0);
                }
              }}
              style={[
                style.textStyle,
                focus ? style.focusStyle : style.highlightStyle
              ]}
            >
              {text}
            </Text>
          );
        })}
      </View>
    );
  };

  render() {
    const { style, words, children } = this.props;
    const lineHeight = style.textStyle.lineHeight;

    return (
      <FlatList
        data={lexer(children, words, this.props.cursor)}
        keyExtractor={(_, i) => String(i)}
        renderItem={this.renderLine}
        getItemLayout={(_, index) => ({
          length: lineHeight,
          offset: lineHeight * index,
          index
        })}
      />
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  }
});

export default connectStyle("FocusWords", {})(FocusWords);
