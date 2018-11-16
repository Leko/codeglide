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
  CodeView,
  FileList,
  PathBreadcrumb
} from "../src";
import { ShallowTree, CodeSearchResultItem } from "@codeglide/domain";
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
        paths={[]}
        repository={{ owner: "Leko", repository: "codeglide" }}
        onSelect={action("onSelect")}
        onRequestMore={action("onRequestMore")}
        onRequestPath={action("onRequestPath")}
        onRequestBack={action("onRequestBack")}
        tree={tree}
      />
    )
  )
  .add("loading", () =>
    withTheme()(
      <DirectorySelector
        paths={[]}
        repository={{ owner: "Leko", repository: "codeglide" }}
        onSelect={action("onSelect")}
        onRequestMore={action("onRequestMore")}
        onRequestPath={action("onRequestPath")}
        onRequestBack={action("onRequestBack")}
        tree={[]}
        loading
      />
    )
  );

storiesOf("pages/LanguageSelector", module).add("initial state", () =>
  withTheme()(
    <LanguageSelector
      onSelect={action("onSelect")}
      onRequestBack={action("onRequestBack")}
      languages={languages}
    />
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
        onRequestBack={action("onRequestBack")}
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
        onRequestBack={action("onRequestBack")}
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
        onRequestBack={action("onRequestBack")}
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
          onRequestBack={action("onRequestBack")}
          onRequestChooseRepository={action("onRequestChooseRepository")}
          onPressSearchResult={action("onPressSearchResult")}
          onRequestChooseLanguage={action("onRequestChooseLanguage")}
          onRequestChooseDirectory={action("onRequestChooseDirectory")}
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
          onRequestBack={action("onRequestBack")}
          onRequestChooseRepository={action("onRequestChooseRepository")}
          onPressSearchResult={action("onPressSearchResult")}
          onRequestChooseLanguage={action("onRequestChooseLanguage")}
          onRequestChooseDirectory={action("onRequestChooseDirectory")}
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
          onRequestBack={action("onRequestBack")}
          onRequestChooseRepository={action("onRequestChooseRepository")}
          onPressSearchResult={action("onPressSearchResult")}
          onRequestChooseLanguage={action("onRequestChooseLanguage")}
          onRequestChooseDirectory={action("onRequestChooseDirectory")}
        />
      </MuiThemeProvider>
    )
  )
  .add("with search result", () =>
    withTheme()(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CodeSearch
          // @ts-ignore
          results={searchResult.items as ReadonlyArray<CodeSearchResultItem>}
          onSubmit={action("onSubmit")}
          onRequestBack={action("onRequestBack")}
          onRequestChooseRepository={action("onRequestChooseRepository")}
          onPressSearchResult={action("onPressSearchResult")}
          onRequestChooseLanguage={action("onRequestChooseLanguage")}
          onRequestChooseDirectory={action("onRequestChooseDirectory")}
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

storiesOf("pages/CodeView", module)
  .add("root", () =>
    withTheme()(
      <CodeView
        onRequestBack={action("onRequestBack")}
        onRequestPath={action("onRequestPath")}
        onRequestLoad={action("onRequestLoad")}
        repository={{ owner: "Leko", repository: "reinbox" }}
        path={null}
        filename="package.json"
        code="package.json"
      />
    )
  )
  .add("with deep path", () =>
    withTheme()(
      <CodeView
        onRequestBack={action("onRequestBack")}
        onRequestPath={action("onRequestPath")}
        onRequestLoad={action("onRequestLoad")}
        repository={{ owner: "Leko", repository: "reinbox" }}
        path="packages/reinbox"
        filename="package.json"
        code="package.json"
      />
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
