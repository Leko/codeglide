import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { SearchHistory } from "@codeglide/domain";
import { SubHeader } from "../atoms/SubHeader";
import Page from "../templates/Page";
import Container from "../molecules/Container";
import { SearchHistoryList } from "../molecules/SearchHistoryList";

type Props = {
  searchHistory: ReadonlyArray<SearchHistory>;
  visibleSearchHistoryCount: number;
  onPressSearchHistory: (history: SearchHistory) => void;
  onPressViewAllHistory: () => void;
};

export const Dashboard: React.SFC<Props> = ({
  searchHistory,
  visibleSearchHistoryCount,
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
    <Container last={false}>
      <SubHeader>Quick search</SubHeader>
    </Container>
    <SearchHistoryList
      histories={searchHistory.slice(0, visibleSearchHistoryCount)}
      onPress={onPressSearchHistory}
    />
    {searchHistory.length > visibleSearchHistoryCount && (
      <Grid container justify="flex-end">
        <Grid item>
          <Button color="primary" onClick={onPressViewAllHistory}>
            View all history
            <NavigateNextIcon />
          </Button>
        </Grid>
      </Grid>
    )}

    <Container last={false}>
      <SubHeader>
        View recent repository
        {"\n"}
        (FIXME: Add repository history)
      </SubHeader>
    </Container>
    <SearchHistoryList
      histories={searchHistory.slice(0, visibleSearchHistoryCount)}
      onPress={onPressSearchHistory}
    />
    {searchHistory.length > visibleSearchHistoryCount && (
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
  searchHistory: [],
  visibleSearchHistoryCount: 3
};
