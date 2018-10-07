import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, select } from "@storybook/addon-knobs";
import { ReadOnlyEditor } from "../src/molecules/ReadOnlyEditor";
const deindent = require("deindent");

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
