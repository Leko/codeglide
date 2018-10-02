import * as React from "react";
import { Dimensions } from "react-native";
import { DangerZone } from "expo";

const { Lottie } = DangerZone;

export class Construction extends React.PureComponent {
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
          width: width,
          height: width * 0.6
        }}
        source={require("../../assets/lottie/construction.json")}
      />
    );
  }
}
