import * as React from "react";
import { View, Text } from "react-native";
import { findAll } from "highlight-words-core";
import { connectStyle } from "@shoutem/theme";

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

type MatchedChunk = {
  start: number;
  end: number;
  highlight: boolean;
};

export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface IStyle {
  textStyle: Object;
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

  render() {
    const { style, words, children } = this.props;
    const lineHeight = style.textStyle.lineHeight;
    let counter = 0;

    return (
      <View>
        {children.split(/\n/).map((line, lineNumber) => (
          <View
            key={lineNumber}
            style={{ height: lineHeight, flexDirection: "row" }}
          >
            {getMatches(line, words).map(
              (chunk: MatchedChunk, index: number) => {
                const text = line.substr(chunk.start, chunk.end - chunk.start);
                if (!chunk.highlight) {
                  return (
                    <Text key={index} style={style && style.textStyle}>
                      {text}
                    </Text>
                  );
                }
                let cursor = counter++;

                return (
                  <Text
                    key={index}
                    onLayout={e => {
                      const { x, width, height } = e.nativeEvent.layout;
                      this.highlightPositions[cursor] = {
                        y: lineNumber * lineHeight,
                        x,
                        width,
                        height
                      };
                      if (cursor === this.props.cursor) {
                        // FIXME: Flaky
                        setTimeout(() => {
                          this.props.onLayoutReady();
                        }, 0);
                      }
                    }}
                    style={[
                      style.textStyle,
                      cursor === this.props.cursor
                        ? style.focusStyle
                        : style.highlightStyle
                    ]}
                  >
                    {text}
                  </Text>
                );
              }
            )}
          </View>
        ))}
      </View>
    );
  }
}

export default connectStyle("FocusWords", {})(FocusWords);
