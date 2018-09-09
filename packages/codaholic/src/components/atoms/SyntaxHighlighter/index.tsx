// Forked from https://github.com/conorhastings/react-native-syntax-highlighter
import React from "react";
import {
  View,
  Platform,
  ScrollView,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native";
import RNSyntaxHighlighter from "react-syntax-highlighter";
import generateNewStylesheet from "./generateNewStylesheet";
import renderer, { HighlightJSTheme } from "./renderer";

type Props = {
  children: string;
  theme: HighlightJSTheme;
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent> | undefined) => any;
  scrollEventThrottle: number;
  scrollViewRef: (ref: ScrollView) => any;
};

const CodeContainer = ({
  scrollViewRef,
  scrollEventThrottle,
  onScroll,
  ...props
}: ScrollViewProps & Props) => {
  return (
    <ScrollView
      {...props}
      horizontal={false}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={onScroll}
      ref={scrollViewRef}
    />
  );
};

export const SyntaxHighlighter: React.SFC<Props> = ({
  fontFamily,
  fontSize,
  lineHeight,
  children,
  theme,
  ...rest
}: Props) => {
  const { transformedStyle, defaultColor } = generateNewStylesheet({
    stylesheet: theme
  });
  return (
    <RNSyntaxHighlighter
      {...rest}
      style={transformedStyle}
      PreTag={CodeContainer}
      renderer={renderer({
        lineHeight,
        defaultColor,
        fontFamily,
        fontSize
      })}
    >
      {children}
    </RNSyntaxHighlighter>
  );
};

SyntaxHighlighter.defaultProps = {
  fontFamily: Platform.OS === "ios" ? "Menlo-Regular" : "monospace",
  fontSize: 12,
  CodeTag: View
};
