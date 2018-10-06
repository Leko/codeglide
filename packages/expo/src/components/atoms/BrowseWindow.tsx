import * as React from "react";
import { Dimensions } from "react-native";
import { DangerZone } from "expo";

const { Lottie } = DangerZone;

export class BrowseWindow extends React.PureComponent {
  render() {
    const { width } = Dimensions.get("window");
    return (
      <Lottie
        ref={ref => {
          if (!ref) return;
          ref.reset();
          ref.play();
        }}
        style={{
          left: -width * (0.15 / 2),
          width: width * 0.7,
          height: width * 0.6
        }}
        source={require("../../assets/lottie/browser.json")}
      />
    );
  }
}
