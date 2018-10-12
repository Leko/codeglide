import { configure, addDecorator } from "@storybook/react";
import { configureViewport } from "@storybook/addon-viewport";
import { withOptions } from "@storybook/addon-options";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";

function loadStories() {
  require("../stories/index");
}

addDecorator(withInfo({ inline: false }));
addDecorator(withKnobs({ escapeHTML: false }));
addDecorator(
  withOptions({
    addonPanelInRight: true
  })
);

configure(loadStories, module);
configureViewport({
  viewports: {
    iphone6: {
      name: "iPhone 6",
      styles: {
        height: "667px",
        width: "375px"
      },
      type: "mobile"
    }
  }
});
