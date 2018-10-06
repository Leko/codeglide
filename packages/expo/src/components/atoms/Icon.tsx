import * as React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { connectStyle } from "@shoutem/theme";

interface IStyle {
  fontSize: number;
  color: string;
}

export type IconName =
  | "search"
  | "check"
  | "close"
  | "clear"
  | "check-box"
  | "check-box-outline-blank"
  | "chevron-left"
  | "chevron-right"
  | "keyboard-arrow-up"
  | "keyboard-arrow-down"
  | "menu";

type Props = {
  style: IStyle;
  name: IconName;
};

export const Icon = ({ style, name }: Props) => (
  <MaterialIcons name={name} size={style.fontSize} color={style.color} />
);

export default connectStyle("Icon", {})(Icon);
