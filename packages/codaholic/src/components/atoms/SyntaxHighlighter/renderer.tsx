// Forked from https://github.com/conorhastings/react-native-syntax-highlighter
import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { createStyleObject } from "react-syntax-highlighter/create-element";

type Node = {
  properties: {
    className: string;
    style: Object;
  };
  type: "text" | "element";
  tagName: string | null;
  value: string;
  children: Array<Node>;
};
type Rows = Array<Node>;

export type HighlightJSTheme = {
  hljs?: {
    color?: string;
    backgroundColor?: string;
  };
};

type NativeElementProps = {
  node: Node;
  stylesheet: HighlightJSTheme;
  key: string;
  defaultColor: string;
  fontFamily: string;
  fontSize?: number;
  lineHeight: number;
  onLongPress: (text: string) => any;
};
type ChildrenProps = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  stylesheet: HighlightJSTheme;
  onLongPress: (text: string) => any;
};
type RendererProps = {
  defaultColor: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  onLongPress: (text: string) => any;
};

const createChildren = ({
  stylesheet,
  fontSize,
  lineHeight,
  fontFamily,
  onLongPress
}: ChildrenProps) => {
  let childrenCount = 0;
  return (children: Array<Node>, defaultColor: string) => {
    childrenCount += 1;
    return children.map((child, i) =>
      createNativeElement({
        node: child,
        stylesheet,
        key: `code-segment-${childrenCount}-${i}`,
        defaultColor,
        fontSize,
        lineHeight,
        fontFamily,
        onLongPress
      })
    );
  };
};

const createNativeElement = ({
  node,
  stylesheet,
  key,
  defaultColor,
  fontFamily,
  lineHeight,
  onLongPress,
  fontSize = 12
}: NativeElementProps) => {
  const { properties, type, tagName: TagName, value } = node;
  const startingStyle = {
    fontFamily,
    fontSize,
    height: fontSize + 5,
    lineHeight
  };
  if (type === "text") {
    return (
      <Text
        onLongPress={onLongPress ? () => onLongPress(value) : undefined}
        key={key}
        style={Object.assign({ color: defaultColor }, startingStyle)}
      >
        {value}
      </Text>
    );
  } else if (TagName) {
    const childrenCreator = createChildren({
      stylesheet,
      fontSize,
      lineHeight,
      fontFamily,
      onLongPress
    });
    const style = createStyleObject(
      properties.className,
      Object.assign({ color: defaultColor }, properties.style, startingStyle),
      stylesheet
    );
    const children = childrenCreator(
      node.children,
      style.color || defaultColor
    );
    return (
      <View key={key} style={styles.row}>
        {children}
      </View>
    );
  } else {
    throw new Error("Invalid props");
  }
};

type LineRendererProps = RendererProps & {
  stylesheet: HighlightJSTheme;
};
const lineRenderer = ({
  defaultColor,
  lineHeight,
  fontFamily,
  fontSize,
  stylesheet,
  onLongPress
}: LineRendererProps) => ({
  item: node,
  index
}: {
  item: Node;
  index: number;
}) =>
  createNativeElement({
    node,
    key: `code-segment-${index}`,
    stylesheet,
    defaultColor,
    fontFamily,
    fontSize,
    lineHeight,
    onLongPress
  });

const renderer = ({
  lineHeight,
  defaultColor,
  fontFamily,
  fontSize,
  onLongPress
}: RendererProps) => {
  return ({
    rows,
    stylesheet
  }: {
    rows: Rows;
    stylesheet: HighlightJSTheme;
  }) => (
    <FlatList
      data={rows}
      keyExtractor={(_, i) => `code-segment-${i}`}
      getItemLayout={(_, index) => ({
        length: lineHeight,
        offset: lineHeight * index,
        index
      })}
      renderItem={lineRenderer({
        defaultColor,
        fontFamily,
        fontSize,
        lineHeight,
        stylesheet,
        onLongPress
      })}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  }
});

export default renderer;
