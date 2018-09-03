import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../atoms/Icon";
import { IconName } from "../atoms/Icon";
import { connectStyle } from "@shoutem/theme";

interface IStyle {}

type Props = {
  style?: IStyle;
  disabled?: boolean;
  styleName?: string;
  icon?: IconName;
  onPress: () => any;
  children: React.ReactNode;
};

export const Button = ({ style, disabled, onPress, icon, children }: Props) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[styles.withIcon, style]}
  >
    <Icon name={icon} styleName={disabled ? "dimmed" : ""} />
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  withIcon: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default connectStyle("Button", {})(Button);
