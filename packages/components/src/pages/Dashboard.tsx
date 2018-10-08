import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { SearchHistory } from "@codeglide/domain";
import { SubHeader } from "../atoms/SubHeader";
import Page from "../templates/Page";
import { SearchHistoryList } from "../molecules/SearchHistoryList";

type Props = {
  searchHistories: ReadonlyArray<SearchHistory>;
  showSearchHistoriesCount: number;
  onPressSearchHistory: (history: SearchHistory) => void;
  onPressViewAllHistory: () => void;
};

export const Dashboard: React.SFC<Props> = ({
  searchHistories,
  showSearchHistoriesCount,
  onPressSearchHistory,
  onPressViewAllHistory
}: Props) => (
  <Page
    title="Dashboard"
    renderHeaderRight={() => (
      <IconButton color="inherit" aria-label="Menu">
        <AccountCircleIcon />
      </IconButton>
    )}
  >
    <SubHeader>Quick search</SubHeader>
    <SearchHistoryList
      histories={searchHistories.slice(0, showSearchHistoriesCount)}
      onPress={onPressSearchHistory}
    />
    {searchHistories.length > showSearchHistoriesCount && (
      <Grid container justify="flex-end">
        <Grid item>
          <Button color="primary" onClick={onPressViewAllHistory}>
            View all history
            <NavigateNextIcon />
          </Button>
        </Grid>
      </Grid>
    )}

    <SubHeader>
      View recent repository
      {"\n"}
      (FIXME: Add repository history)
    </SubHeader>
    <SearchHistoryList
      histories={searchHistories.slice(0, showSearchHistoriesCount)}
      onPress={onPressSearchHistory}
    />
    {searchHistories.length > showSearchHistoriesCount && (
      <Grid container justify="flex-end">
        <Grid item>
          <Button color="primary" onClick={onPressViewAllHistory}>
            View all opened repositories
            <NavigateNextIcon />
          </Button>
        </Grid>
      </Grid>
    )}
  </Page>
);

Dashboard.defaultProps = {
  searchHistories: [],
  showSearchHistoriesCount: 3
};
