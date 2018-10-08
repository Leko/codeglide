import * as React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { SearchHistory } from "@codeglide/domain";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
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
  <Page title="Dashboard">
    <Typography variant="h3" color="inherit">
      Quick search
    </Typography>
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

    <Typography variant="h3" color="inherit">
      View recent repository
      {"\n"}
      (FIXME: Add repository history)
    </Typography>
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
