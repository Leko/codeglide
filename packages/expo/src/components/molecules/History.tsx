import * as React from "react";
import { View } from "react-native";
import { Caption } from "../atoms/Caption";
import { Text } from "../atoms/Text";
import DistanceToNow from "../atoms/DistanceToNow";
import { connectStyle } from "@shoutem/theme";
import { History as HistoryType } from "../../modules/searchHistory/state";

interface IStyle {}

type Props = {
  style?: IStyle;
  history: HistoryType;
};

export const History = ({ style, history }: Props) => (
  <View>
    <Text>
      <Caption>"{history.query.q}"</Caption>{" "}
      <Text>
        {history.query.path ? `${history.query.path} ` : ""}
        in {history.query.repo}
      </Text>
    </Text>
    <View style={{ alignItems: "flex-end" }}>
      <DistanceToNow date={new Date(history.searchedAt)} />
    </View>
  </View>
);

export default connectStyle("History", {})(History);
