import * as React from "react";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { Text } from "../atoms/Text";
import { connectStyle } from "@shoutem/theme";

interface IStyle {
  borderBottomWidth: number;
}

type Props = {
  style?: IStyle;
  date: Date;
};

export const DistanceToNow = ({ style, date }: Props) => (
  <Text>
    {distanceInWordsToNow(date, {
      addSuffix: true
    })}
  </Text>
);

const defaultStyle = {};

export default connectStyle("DistanceToNow", defaultStyle)(DistanceToNow);
