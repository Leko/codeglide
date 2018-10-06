import * as React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "../atoms/Icon";
import { IconName } from "../atoms/Icon";
import { connectStyle } from "@shoutem/theme";

interface IStyle {}

type Props = {
  style?: IStyle;
  disabled?: boolean;
  styleName?: string;
  icon?: IconName;
  rightIcon?: IconName;
  onPress: () => any;
  children: React.ReactNode;
};

export const Button = ({
  style,
  disabled,
  onPress,
  icon,
  rightIcon,
  children
}: Props) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[styles.withIcon, style]}
  >
    {icon && (
      <View style={{ marginRight: 10 }}>
        <Icon name={icon} styleName={disabled ? "dimmed" : ""} />
      </View>
    )}
    {children}
    {rightIcon && (
      <Icon name={rightIcon} styleName={disabled ? "dimmed" : ""} />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  withIcon: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default connectStyle("Button", {})(Button);
