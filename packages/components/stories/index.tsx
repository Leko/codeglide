import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, select } from "@storybook/addon-knobs";
import { ReadOnlyEditor } from "../src/molecules/ReadOnlyEditor";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Dashboard, CodeSearchResult, RepositorySelector } from "../src";
const deindent = require("deindent");

storiesOf("sandbox", module).add("sandbox", () => <div />);

const repos = [
  {
    owner: "Leko",
    repository: "hothouse"
  },
  {
    owner: "nodejs",
    repository: "node"
  },
  {
    owner: "phenyl-js",
    repository: "phenyl"
  }
];
const repoHistories = repos.map(repo => ({
  digest: `${repo.owner}/${repo.repository}`,
  repository: repo,
  lastOpenedAt: new Date().getTime()
}));
storiesOf("pages/RepositorySelector", module)
  .add("initial state", () => (
    <MuiThemeProvider theme={createMuiTheme()}>
      <RepositorySelector
        onChange={action("onChange")}
        onSelect={action("onSelect")}
        repositories={[]}
        recentlyOpenedRepositories={repoHistories}
      />
    </MuiThemeProvider>
  ))
  .add("searching", () => (
    <MuiThemeProvider theme={createMuiTheme()}>
      <RepositorySelector
        loading
        onChange={action("onChange")}
        onSelect={action("onSelect")}
        defaultValue={{ owner: "Leko", repository: "hothouse" }}
        repositories={[]}
        recentlyOpenedRepositories={repoHistories}
      />
    </MuiThemeProvider>
  ))
  .add("after query", () => (
    <MuiThemeProvider theme={createMuiTheme()}>
      <RepositorySelector
        onChange={action("onChange")}
        onSelect={action("onSelect")}
        defaultValue={{ owner: "Leko", repository: "hothouse" }}
        repositories={repos}
        recentlyOpenedRepositories={repoHistories}
      />
    </MuiThemeProvider>
  ));

storiesOf("pages/CodeSearchResult", module).add("initial state", () => {
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <CodeSearchResult
        repositoryHistory={[
          {
            owner: "Leko",
            repository: "hothouse",
            lastOpenedAt: new Date().getTime()
          },
          {
            owner: "nodejs",
            repository: "node",
            lastOpenedAt: new Date(Date.now() - 1000 * 60 * 5).getTime()
          }
        ]}
      />
    </MuiThemeProvider>
  );
});

storiesOf("pages/Dashboard", module).add("has valid values", () => {
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <Dashboard
        onPressSearchHistory={action("onPressSearchHistory")}
        onPressViewAllHistory={action("onPressViewAllHistory")}
        visibleSearchHistoryCount={3}
        searchHistory={[
          {
            query: {
              q: "jest",
              repo: "Leko/hothouse",
              in: "path",
              path: "packages/@hothouse/monorepo-lerna",
              language: "javascript"
            },
            digest: "xxx-1",
            searchedAt: new Date().getTime()
          },
          {
            query: {
              q: "main",
              repo: "nodejs/node"
            },
            digest: "xxx-2",
            searchedAt: new Date(Date.now() - 1000 * 60 * 5).getTime()
          },
          {
            query: {
              q: "xxx",
              repo: "nodejs/node"
            },
            digest: "xxx-3",
            searchedAt: new Date(Date.now() - 1000 * 60 * 5).getTime()
          },
          {
            query: {
              q: "yyy",
              repo: "nodejs/node"
            },
            digest: "xxx-4",
            searchedAt: new Date(Date.now() - 1000 * 60 * 5).getTime()
          }
        ]}
      />
    </MuiThemeProvider>
  );
});

storiesOf("ReadOnlyEditor", module).add("Show TypeScript code", () => (
  <ReadOnlyEditor
    editorDidMount={action("editorDidMount")}
    language={text("language", "typescript")}
    width={text("width", "100%")}
    height={text("height", "200")}
    theme={select("theme", ["vs-dark", "vs", "hc-black"], "vs-dark")}
    value={text(
      "value",
      deindent`
    import { Hoge } from './Hoge'
    const hoge = 2
    const foo = (some) => (unused) => (variables) => () => () => () => () => () => () => () => () => () => () => () => () => () => {
      const h = new Hoge()
      return hoge + 1
    }
    foo()
    `
    )}
  />
));
