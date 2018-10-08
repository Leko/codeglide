import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, select } from "@storybook/addon-knobs";
import { ReadOnlyEditor } from "../src/molecules/ReadOnlyEditor";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { SearchHistory } from "@codeglide/domain";
import { Dashboard } from "../src/pages/Dashboard";
const deindent = require("deindent");

storiesOf("sandbox", module).add("sandbox", () => <div />);

storiesOf("pages/Dashboard", module).add("has valid values", () => {
  const theme = createMuiTheme({
    // palette: {
    //   type: "dark" // Switching the dark mode on is a single property value change.
    // }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Dashboard
        onPressSearchHistory={action("onPressSearchHistory")}
        onPressViewAllHistory={action("onPressViewAllHistory")}
        showSearchHistoriesCount={3}
        searchHistories={
          [
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
          ] as ReadonlyArray<SearchHistory>
        }
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
