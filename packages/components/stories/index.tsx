import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, select } from "@storybook/addon-knobs";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  Dashboard,
  CodeSearch,
  RepositorySelector,
  LanguageSelector,
  DirectorySelector,
  ReadOnlyEditor,
  FileList,
  PathBreadcrumb
} from "../src";
import { ShallowTree } from "@codeglide/domain";
import { languages } from "@codeglide/languages";
import tree from "./assets/tree.json";
import searchResult from "./assets/searchResult.json";
const deindent = require("deindent");

const withTheme = (theme = createMuiTheme()) => (
  component: React.ReactNode
) => <MuiThemeProvider theme={theme}>{component}</MuiThemeProvider>;

storiesOf("pages/DirectorySelector", module)
  .add("initial state", () =>
    withTheme()(
      <DirectorySelector
        onSelect={action("onSelect")}
        onRequestMore={action("onRequestMore")}
        onRequestPath={action("onRequestPath")}
        tree={tree}
      />
    )
  )
  .add("loading", () =>
    withTheme()(
      <DirectorySelector
        onSelect={action("onSelect")}
        onRequestMore={action("onRequestMore")}
        onRequestPath={action("onRequestPath")}
        tree={[]}
        loading
      />
    )
  );

storiesOf("pages/LanguageSelector", module).add("initial state", () =>
  withTheme()(
    <LanguageSelector onSelect={action("onSelect")} languages={languages} />
  )
);

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
  .add("initial state", () =>
    withTheme()(
      <RepositorySelector
        onChange={action("onChange")}
        onSelect={action("onSelect")}
        repositories={[]}
        recentlyOpenedRepositories={repoHistories}
      />
    )
  )
  .add("searching", () =>
    withTheme()(
      <RepositorySelector
        loading
        onChange={action("onChange")}
        onSelect={action("onSelect")}
        defaultValue={{ owner: "Leko", repository: "hothouse" }}
        repositories={[]}
        recentlyOpenedRepositories={repoHistories}
      />
    )
  )
  .add("after query", () =>
    withTheme()(
      <RepositorySelector
        onChange={action("onChange")}
        onSelect={action("onSelect")}
        defaultValue={{ owner: "Leko", repository: "hothouse" }}
        repositories={repos}
        recentlyOpenedRepositories={repoHistories}
      />
    )
  );

storiesOf("pages/CodeSearch", module)
  .add("initial state", () =>
    withTheme()(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CodeSearch
          onSubmit={action("onSubmit")}
          onPressSearchResult={action("onPressSearchResult")}
        />
      </MuiThemeProvider>
    )
  )
  .add("with defaultValue", () =>
    withTheme()(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CodeSearch
          defaultValue={{
            q: "process.exit();",
            repo: {
              owner: "lerna",
              repository: "lerna"
            },
            path: "/commands/publish",
            language: "JavaScript"
          }}
          onSubmit={action("onSubmit")}
          onPressSearchResult={action("onPressSearchResult")}
        />
      </MuiThemeProvider>
    )
  )
  .add("searching", () =>
    withTheme()(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CodeSearch
          searching
          defaultValue={{
            q: "process.exit();",
            repo: {
              owner: "lerna",
              repository: "lerna"
            },
            path: "/commands/publish",
            language: "JavaScript"
          }}
          onSubmit={action("onSubmit")}
          onPressSearchResult={action("onPressSearchResult")}
        />
      </MuiThemeProvider>
    )
  )
  .add("with search result", () =>
    withTheme()(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CodeSearch
          results={searchResult}
          onSubmit={action("onSubmit")}
          onPressSearchResult={action("onPressSearchResult")}
        />
      </MuiThemeProvider>
    )
  );

storiesOf("pages/Dashboard", module).add("has valid values", () =>
  withTheme()(
    <MuiThemeProvider theme={createMuiTheme()}>
      <Dashboard
        onPressSearchHistory={action("onPressSearchHistory")}
        onRequestAllSearchHistory={action("onRequestAllSearchHistory")}
        onPressRepositoryHistory={action("onPressRepositoryHistory")}
        onRequestSearch={action("onRequestSearch")}
        onRequestAllRepositoryHistory={action("onRequestAllRepositoryHistory")}
        visibleSearchHistoryCount={2}
        visibleRepositoryHistoryCount={2}
        searchHistory={[
          {
            query: {
              q: "jest",
              repo: { owner: "Leko", repository: "hothouse" },
              in: "path",
              path: "packages/@hothouse/monorepo-lerna",
              language: "JavaScript"
            },
            digest: "xxx-1",
            searchedAt: new Date().getTime()
          },
          {
            query: {
              q: "main",
              repo: { owner: "nodejs", repository: "node" }
            },
            digest: "xxx-2",
            searchedAt: new Date(Date.now() - 1000 * 60 * 5).getTime()
          },
          {
            query: {
              q: "xxx",
              repo: { owner: "nodejs", repository: "node" }
            },
            digest: "xxx-3",
            searchedAt: new Date(Date.now() - 1000 * 60 * 5).getTime()
          },
          {
            query: {
              q: "yyy",
              repo: { owner: "nodejs", repository: "node" }
            },
            digest: "xxx-4",
            searchedAt: new Date(Date.now() - 1000 * 60 * 5).getTime()
          }
        ]}
        repositoryHistory={repoHistories}
      />
    </MuiThemeProvider>
  )
);

storiesOf("molecules/PathBreadcrumb", module)
  .add("empty", () =>
    withTheme()(<PathBreadcrumb onPress={action("onPress")} paths={[]} />)
  )
  .add("deep", () =>
    withTheme()(
      <PathBreadcrumb
        onPress={action("onPress")}
        paths={[
          "hoge",
          "foo",
          "bar",
          "buzz",
          "hige",
          "hage",
          "moge",
          "fizz",
          "buzz"
        ]}
      />
    )
  );

storiesOf("molecules/FileList", module)
  .add("mixed", () =>
    withTheme()(
      <FileList
        onPress={action("onPress")}
        onRequestMore={action("onRequestMore")}
        tree={(tree as unknown) as ShallowTree}
      />
    )
  )
  .add("selectable", () =>
    withTheme()(
      <FileList
        onPress={action("onPress")}
        onRequestMore={action("onRequestMore")}
        tree={(tree as unknown) as ShallowTree}
        selectable
        selectedPath={tree[0].path}
      />
    )
  )
  .add("placeholder", () =>
    withTheme()(<FileList onPress={action("onPress")} tree={[]} placeholder />)
  );

storiesOf("molecules/ReadOnlyEditor", module).add("Show TypeScript code", () =>
  withTheme()(
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
  )
);
