import * as React from "react";
import { Repository, RepositoryHistory } from "@codeglide/domain";
import Container from "../molecules/Container";
import Paper from "../molecules/Paper";
import { RepositoryList } from "../molecules/RepositoryList";
import { RepositoryHistoryList } from "../molecules/RepositoryHistoryList";
import { BackButton } from "../molecules/BackButton";
import { RepositoryForm } from "../organisms/RepositoryForm";
import Page from "../templates/Page";

export type Props = {
  onSelect: (repository: Repository) => void;
  onChange: (repository: Repository) => void;
  onRequestBack: () => void;
  loading?: boolean;
  repositories: ReadonlyArray<Repository>;
  recentlyOpenedRepositories: ReadonlyArray<RepositoryHistory>;
  defaultValue?: Repository;
};

export const RepositorySelector: React.SFC<Props> = ({
  repositories,
  recentlyOpenedRepositories,
  defaultValue,
  loading = false,
  onChange,
  onSelect,
  onRequestBack
}: Props) => (
  <Page
    title="Choose repository"
    renderHeaderLeft={() => <BackButton onPress={onRequestBack} />}
  >
    <Container last={false}>
      <Paper>
        <RepositoryForm defaultValue={defaultValue} onChange={onChange} />
      </Paper>
    </Container>
    {loading ? (
      <RepositoryList placeholder repositories={[]} onPress={() => {}} />
    ) : repositories.length > 0 ? (
      <RepositoryList repositories={repositories} onPress={onSelect} />
    ) : (
      <RepositoryHistoryList
        subheader="Open recent"
        repositories={recentlyOpenedRepositories}
        onPress={onSelect}
      />
    )}
  </Page>
);

RepositorySelector.defaultProps = {
  recentlyOpenedRepositories: []
};
