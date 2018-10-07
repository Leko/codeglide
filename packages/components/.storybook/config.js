import { configure, addDecorator } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";

function loadStories() {
  require("../stories/index");
}

addDecorator(withInfo({ inline: true }));
addDecorator(withKnobs({ escapeHTML: false }));
addDecorator(
  withOptions({
    addonPanelInRight: true
  })
);

configure(loadStories, module);
