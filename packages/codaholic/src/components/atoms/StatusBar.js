import * as React from "react";
import { contrastRatio } from "chromatism";
import { StatusBar as RNStatusBar } from "react-native";
import { connectStyle } from "@shoutem/theme";

interface IStyle {
  backgroundColor: string;
}

type Props = {
  style: IStyle
};

export const StatusBar = ({ style }: Props) => (
  <RNStatusBar
    barStyle={
      contrastRatio(style.backgroundColor).hex === "#ffffff"
        ? "light-content"
        : "dark-content"
    }
    backgroundColor={style && style.backgroundColor}
  />
);

export default connectStyle("StatusBar", {})(StatusBar);
