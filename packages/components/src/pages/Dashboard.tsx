import * as React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
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
import FloatingActionButton from "../molecules/FloatingActionButton";
import { Row } from "../molecules/Row";
import { SearchHistoryList } from "../molecules/SearchHistoryList";
import { RepositoryHistoryList } from "../molecules/RepositoryHistoryList";

type Props = {
  searchHistory: ReadonlyArray<SearchHistory>;
  repositoryHistory: ReadonlyArray<RepositoryHistory>;
  visibleSearchHistoryCount: number;
  visibleRepositoryHistoryCount: number;
  onPressSearchHistory: (history: SearchHistory) => void;
  onPressRepositoryHistory: (history: Repository) => void;
  onRequestSearch: () => void;
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
  onRequestSearch,
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
      <Row justifyContent="flex-end">
        <Button color="primary" onClick={onRequestAllSearchHistory}>
          View all search history
          <NavigateNextIcon />
        </Button>
      </Row>
    )}

    <Container last={false}>
      <SubHeader>View recent repository</SubHeader>
    </Container>
    <RepositoryHistoryList
      repositories={repositoryHistory.slice(0, visibleRepositoryHistoryCount)}
      onPress={onPressRepositoryHistory}
    />
    {repositoryHistory.length > visibleRepositoryHistoryCount && (
      <Row justifyContent="flex-end">
        <Button color="primary" onClick={onRequestAllRepositoryHistory}>
          View all opened repositories
          <NavigateNextIcon />
        </Button>
      </Row>
    )}
    <Row justifyContent="flex-end">
      <FloatingActionButton onPress={onRequestSearch}>
        <SearchIcon />
      </FloatingActionButton>
    </Row>
  </Page>
);

Dashboard.defaultProps = {
  searchHistory: []
};
