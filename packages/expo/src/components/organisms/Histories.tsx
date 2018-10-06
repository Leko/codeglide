import * as React from "react";
import { TouchableOpacity } from "react-native";
import History from "../molecules/History";
import ListItem from "../molecules/ListItem";
import { connectStyle } from "@shoutem/theme";
import { History as HistoryType } from "../../modules/searchHistory/state";

interface IStyle {}

type Props = {
  style?: IStyle;
  histories: Array<HistoryType>;
  onPress: (history: HistoryType) => any;
};

export const Histories = ({ style, histories, onPress }: Props) =>
  histories.map(history => (
    <ListItem key={history.digest}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => onPress(history)}>
        <History history={history} />
      </TouchableOpacity>
    </ListItem>
  ));

export default connectStyle("Histories", {})(Histories);
