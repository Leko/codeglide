import * as React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { connectStyle } from "@shoutem/theme";

interface IStyle {
  fontSize: number;
  color: string;
}

type Props = {
  style: IStyle;
  name: "check" | "close" | "check-box" | "check-box-outline-blank";
};

export const Icon = ({ style, name }: Props) => (
  <MaterialIcons name={name} size={style.fontSize} color={style.color} />
);

export default connectStyle("Icon", {})(Icon);
