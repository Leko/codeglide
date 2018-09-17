import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Caption } from "../atoms/Caption";
import { connectStyle } from "@shoutem/theme";

interface IStyle {}

type Props = {
  style?: IStyle;
  disabled?: boolean;
  destructive?: boolean;
  onPress: () => any;
  children: React.ReactNode;
};

export const BackdropButton = ({
  style,
  disabled = false,
  onPress,
  children
}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.base, style]}
    disabled={disabled}
  >
    <Caption>{children}</Caption>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  base: {
    minWidth: 75,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connectStyle("BackdropButton", {})(BackdropButton);
