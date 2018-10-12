import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {
  SearchHistory,
  RepositoryHistory,
  Repository
} from "@codeglide/domain";
import { SubHeader } from "../atoms/SubHeader";
import Page from "../templates/Page";
import Container from "../molecules/Container";
import { SearchHistoryList } from "../molecules/SearchHistoryList";
import { RepositoryHistoryList } from "../molecules/RepositoryHistoryList";

type Props = {
  searchHistory: ReadonlyArray<SearchHistory>;
  repositoryHistory: ReadonlyArray<RepositoryHistory>;
  visibleSearchHistoryCount: number;
  visibleRepositoryHistoryCount: number;
  onPressSearchHistory: (history: SearchHistory) => void;
  onPressRepositoryHistory: (history: Repository) => void;
  onRequestAllSearchHistory: () => void;
  onRequestAllRepositoryHistory: () => void;
};

export const Dashboard: React.SFC<Props> = ({
  searchHistory,
  repositoryHistory,
  visibleSearchHistoryCount,
  visibleRepositoryHistoryCount,
  onPressSearchHistory,
  onPressRepositoryHistory,
  onRequestAllSearchHistory,
  onRequestAllRepositoryHistory
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
      <SubHeader>Search history</SubHeader>
    </Container>
    <SearchHistoryList
      histories={searchHistory.slice(0, visibleSearchHistoryCount)}
      onPress={onPressSearchHistory}
    />
    {searchHistory.length > visibleSearchHistoryCount && (
      <Grid container justify="flex-end">
        <Grid item>
          <Button color="primary" onClick={onRequestAllSearchHistory}>
            View all search history
            <NavigateNextIcon />
          </Button>
        </Grid>
      </Grid>
    )}

    <Container last={false}>
      <SubHeader>View recent repository</SubHeader>
    </Container>
    <RepositoryHistoryList
      repositories={repositoryHistory.slice(0, visibleRepositoryHistoryCount)}
      onPress={onPressRepositoryHistory}
    />
    {repositoryHistory.length > visibleRepositoryHistoryCount && (
      <Grid container justify="flex-end">
        <Grid item>
          <Button color="primary" onClick={onRequestAllRepositoryHistory}>
            View all opened repositories
            <NavigateNextIcon />
          </Button>
        </Grid>
      </Grid>
    )}
  </Page>
);

Dashboard.defaultProps = {
  searchHistory: []
};
