import * as React from "react";
import { Dimensions } from "react-native";
import { DangerZone } from "expo";

const { Lottie } = DangerZone;

export class EmptyStatus extends React.PureComponent {
  render() {
    return (
      <Lottie
        ref={ref => {
          if (!ref) return;
          ref.reset();
          ref.play();
        }}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").width
        }}
        source={require("../../assets/lottie/moonlight.json")}
      />
    );
  }
}
