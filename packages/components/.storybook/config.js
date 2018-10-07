import { configure, addDecorator } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import { withInfo } from "@storybook/addon-info";

function loadStories() {
  require("../stories/index");
}

addDecorator(withInfo({ inline: true }));
addDecorator(
  withOptions({
    addonPanelInRight: true
  })
);

configure(loadStories, module);
