import * as React from "react";
import List from "@material-ui/core/List";
import { SearchHistory as SearchHistoryType } from "@codeglide/domain";
import { SearchHistory } from "./SearchHistory";

type Props = {
  histories: ReadonlyArray<SearchHistoryType>;
  onPress: (history: SearchHistoryType) => void;
};

export const SearchHistoryList = ({ histories, onPress }: Props) => (
  <List>
    {histories.map(history => (
      <SearchHistory
        key={history.digest}
        history={history}
        onPress={() => onPress(history)}
      />
    ))}
  </List>
);
