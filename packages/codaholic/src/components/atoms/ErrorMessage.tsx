import * as React from "react";
import { Text } from "react-native";
import { connectStyle } from "@shoutem/theme";

interface IStyle {
  color: string;
}

type Props = {
  style?: IStyle;
  children: React.ReactNode;
};

export const ErrorMessage = ({ style, children }: Props) => (
  <Text style={style}>{children}</Text>
);

export default connectStyle("ErrorMessage", {})(ErrorMessage);
