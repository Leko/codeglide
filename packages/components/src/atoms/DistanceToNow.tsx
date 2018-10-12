import * as React from "react";
import { Text } from "./Text";
const distanceInWordsToNow = require("date-fns/distance_in_words_to_now"); // FIXME: Change to import

type Props = {
  date: Date;
};

export const DistanceToNow = ({ date }: Props) => (
  <Text>
    {distanceInWordsToNow(date, {
      addSuffix: true
    })}
  </Text>
);
