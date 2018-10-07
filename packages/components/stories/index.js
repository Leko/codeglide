import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { action } from "@storybook/addon-actions";
import Button from "../src/molecules/Button";

storiesOf("Button", module)
  .add(
    "with text",
    withInfo({ inline: true })(() => (
      <Button onClick={action("clicked")}>Hello Button</Button>
    ))
  )
  .add(
    "with some emoji",
    withInfo({ inline: true })(() => (
      <Button onClick={action("clicked")}>
        <span role="img" aria-label="so cool">
          😀 😎 👍 💯
        </span>
      </Button>
    ))
  );
