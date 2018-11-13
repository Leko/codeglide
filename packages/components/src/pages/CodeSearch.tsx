import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  SearchParamsState,
  CodeSearchResult,
  CodeSearchResultItem,
  Repository
} from "@codeglide/domain";
import { Language } from "@codeglide/languages";
import Page from "../templates/Page";
import CodeSearchForm from "../organisms/CodeSearchForm";
import CodeSearchResultList from "../molecules/CodeSearchResultList";
import { BackButton } from "../molecules/BackButton";

export type Props = {
  results?: CodeSearchResult;
  searching?: boolean;
  defaultValue?: SearchParamsState;
  onSubmit: (params: SearchParamsState) => void;
  onRequestBack: () => void;
  onRequestChooseRepository: (repository?: Repository) => void;
  onRequestChooseLanguage: (language?: Language) => void;
  onRequestChooseDirectory: (repository: Repository) => void;
  onPressSearchResult: (params: CodeSearchResultItem) => void;
};

export const CodeSearch: React.SFC<Props> = ({
  results,
  searching,
  defaultValue,
  onSubmit,
  onRequestBack,
  onRequestChooseRepository,
  onRequestChooseLanguage,
  onRequestChooseDirectory,
  onPressSearchResult
}: Props) => (
  <Page
    title="Search code"
    renderHeaderLeft={() => <BackButton onPress={onRequestBack} />}
  >
    <Paper square>
      <CodeSearchForm
        defaultValue={defaultValue}
        onSubmit={onSubmit}
        onRequestChooseRepository={onRequestChooseRepository}
        onRequestChooseLanguage={onRequestChooseLanguage}
        onRequestChooseDirectory={onRequestChooseDirectory}
        disabled={searching}
      />
    </Paper>
    <CodeSearchResultList
      placeholder={searching}
      results={!searching && results ? results.items : []}
      onPress={onPressSearchResult}
    />
  </Page>
);
