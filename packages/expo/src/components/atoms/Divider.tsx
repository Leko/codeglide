import * as React from "react";
import { View } from "react-native";
import { connectStyle } from "@shoutem/theme";

interface IStyle {
  borderBottomWidth: number;
}

type Props = {
  style?: IStyle;
};

export const Divider = ({ style }: Props) => <View style={style} />;

const defaultStyle = {
  borderBottomWidth: 1
};

export default connectStyle("Divider", defaultStyle)(Divider);
