import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Repository, RepositoryHistory } from "@codeglide/domain";
import Container from "../molecules/Container";
import { RepositoryList } from "../molecules/RepositoryList";
import { RepositoryHistoryList } from "../molecules/RepositoryHistoryList";
import { RepositoryForm } from "../organisms/RepositoryForm";
import Page from "../templates/Page";

type Props = {
  onSelect: (repository: Repository) => void;
  onChange: (repository: Repository) => void;
  loading?: boolean;
  repositories: ReadonlyArray<Repository>;
  recentlyOpenedRepositories: ReadonlyArray<RepositoryHistory>;
  defaultValue?: Repository;
  classes?: {
    paper: string;
  };
};

export const RepositorySelector: React.SFC<Props> = ({
  repositories,
  recentlyOpenedRepositories,
  defaultValue,
  classes,
  loading = false,
  onChange,
  onSelect
}: Props) => (
  <Page
    title="Choose repository"
    renderHeaderLeft={() => (
      <IconButton color="inherit" aria-label="Menu">
        <NavigateBeforeIcon />
      </IconButton>
    )}
  >
    <Container last={false}>
      <Paper square elevation={1} className={classes!.paper}>
        <RepositoryForm defaultValue={defaultValue} onChange={onChange} />
      </Paper>
    </Container>
    {loading ? (
      <RepositoryList placeholder repositories={[]} onPress={onSelect} />
    ) : repositories.length > 0 ? (
      <RepositoryList repositories={repositories} onPress={onSelect} />
    ) : (
      <RepositoryHistoryList
        repositories={recentlyOpenedRepositories}
        onPress={onSelect}
      />
    )}
  </Page>
);

RepositorySelector.defaultProps = {
  recentlyOpenedRepositories: []
};

const styles = {
  paper: {
    padding: 10
  }
};

export default withStyles(styles)(RepositorySelector);
