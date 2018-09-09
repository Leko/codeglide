// Forked from https://github.com/conorhastings/react-native-syntax-highlighter
import React from "react";
import { FlatList, Text } from "react-native";
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

type ChildrenProps = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  stylesheet: HighlightJSTheme;
};
type RendererProps = {
  defaultColor: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
};

const createChildren = ({
  stylesheet,
  fontSize,
  lineHeight,
  fontFamily
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
        fontFamily
      })
    );
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
};
const createNativeElement = ({
  node,
  stylesheet,
  key,
  defaultColor,
  fontFamily,
  lineHeight,
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
      fontFamily
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
      <Text key={key} style={style}>
        {children}
      </Text>
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
  stylesheet
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
    lineHeight
  });

const renderer = ({
  lineHeight,
  defaultColor,
  fontFamily,
  fontSize
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
        stylesheet
      })}
    />
  );
};

export default renderer;
