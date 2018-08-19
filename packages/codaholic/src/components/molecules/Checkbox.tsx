import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Toggle } from "react-powerplug";
import Icon from "../atoms/Icon";
import { connectStyle } from "@shoutem/theme";

interface IStyle {
  fontSize: number;
  color: string;
  activeColor?: string;
}

type Props = {
  style: IStyle;
  checked: boolean;
  onChange: (checked: boolean) => any;
};

export const Checkbox = ({ style, checked, onChange }: Props) => (
  <Toggle initial={checked}>
    {({ on, toggle }) => (
      <TouchableOpacity
        onPress={() => {
          onChange(!on);
          toggle();
        }}
      >
        <Icon
          name={on ? "check-box" : "check-box-outline-blank"}
          style={{
            ...style,
            color: on && style.activeColor ? style.activeColor : style.color
          }}
        />
      </TouchableOpacity>
    )}
  </Toggle>
);

export default connectStyle("Checkbox", {})(Checkbox);
