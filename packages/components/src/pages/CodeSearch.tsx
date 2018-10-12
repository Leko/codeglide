import * as React from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import {
  SearchParams,
  CodeSearchResult,
  CodeSearchResultItem
} from "@codeglide/domain";
import Page from "../templates/Page";
import CodeSearchForm from "../organisms/CodeSearchForm";
import CodeSearchResultList from "../molecules/CodeSearchResultList";

type Props = {
  results?: CodeSearchResult;
  searching?: boolean;
  defaultValue?: SearchParams;
  onSubmit: (params: SearchParams) => void;
  onPressSearchResult: (params: CodeSearchResultItem) => void;
};

export const CodeSearch: React.SFC<Props> = ({
  results,
  searching,
  defaultValue,
  onSubmit,
  onPressSearchResult
}: Props) => (
  <Page
    title="Search code"
    renderHeaderLeft={() => (
      <IconButton color="inherit" aria-label="Menu">
        <NavigateBeforeIcon />
      </IconButton>
    )}
  >
    <Paper square>
      <CodeSearchForm
        defaultValue={defaultValue}
        onSubmit={onSubmit}
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
