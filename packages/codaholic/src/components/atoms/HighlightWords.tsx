import * as React from "react";
import RNHighlightWords from "react-native-highlight-words";
import { connectStyle } from "@shoutem/theme";

interface IStyle {
  textStyle: Object;
  highlightStyle: Object;
}

type Props = {
  style?: IStyle;
  words: Array<string>;
  children: string;
};

export const HighlightWords = ({ style, words, children }: Props) => (
  <RNHighlightWords
    style={style && style.textStyle}
    highlightStyle={style && style.highlightStyle}
    searchWords={words}
    textToHighlight={children}
  />
);

const defaultStyle = {
  textStyle: {},
  highlightStyle: {}
};

export default connectStyle("HighlightWords", defaultStyle)(HighlightWords);
