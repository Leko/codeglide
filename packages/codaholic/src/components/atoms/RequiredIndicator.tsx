import * as React from "react";
import { Text } from "react-native";
import { connectStyle } from "@shoutem/theme";

interface IStyle {
  color: string;
}

type Props = {
  style?: IStyle;
};

export const RequiredIndicator = ({ style }: Props) => (
  <Text style={style}>*</Text>
);

export default connectStyle("RequiredIndicator", {})(RequiredIndicator);
