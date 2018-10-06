// @flow
import React from "react";
import { Component } from "react";
import { EmitterSubscription } from "react-native";
import { Keyboard, Animated, Easing } from "react-native";

type State = {
  spacerHeight: Animated.Value | null;
};

export default class KeyboardSpacer extends Component<void, State> {
  keyboardWillShowListener: EmitterSubscription | null = null;
  keyboardWillHideListener: EmitterSubscription | null = null;

  state: State = {
    spacerHeight: null
  };

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    if (this.keyboardWillShowListener) {
      this.keyboardWillShowListener.remove();
    }
    if (this.keyboardWillHideListener) {
      this.keyboardWillHideListener.remove();
    }
  }

  keyboardWillShow = (e: any) => {
    const animation = new Animated.Value(0);
    this.setState({ spacerHeight: animation });

    Animated.timing(animation, {
      easing: Easing.out(Easing.ease),
      duration: e.duration / 2,
      toValue: e.endCoordinates.height
    }).start();
  };

  keyboardWillHide = (e: any) => {
    const animation = new Animated.Value(e.endCoordinates.height);
    this.setState({ spacerHeight: animation });

    Animated.timing(animation, {
      easing: Easing.out(Easing.ease),
      duration: e.duration / 2,
      toValue: 0
    }).start();
  };

  render() {
    return <Animated.View style={{ height: this.state.spacerHeight }} />;
  }
}
