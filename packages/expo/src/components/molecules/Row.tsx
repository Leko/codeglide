import * as React from "react";
import { View, StyleSheet } from "react-native";
import { connectStyle } from "@shoutem/theme";

interface IStyle {}

type Props = {
  style?: IStyle;
  children: React.ReactNode;
};

export const Row = ({ style, children }: Props) => (
  <View style={[styles.container, style]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default connectStyle("Row", {})(Row);
