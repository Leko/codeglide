import * as React from "react";
import { View, Text } from "@shoutem/ui";
import { connectStyle } from "@shoutem/theme";
import RNSnackBar from "react-native-snackbar-component";

interface IStyle {
  backgroundColor: string;
  color: string;
  actionColor: string;
}
type Props = {
  style?: IStyle;
  visible: boolean;
  message: string;
  actionText: string;
  delay?: number;
  onPress: () => any;
};
type State = {
  visible: boolean;
};

export class SnackBar extends React.PureComponent<Props, State> {
  state: State = { visible: false };

  static defaultProps = {
    delay: 0
  };

  // react-native-snackbar-component don't animate when visible=true from the beginning.
  // So turn off initial visible, and update visible later.
  componentDidMount() {
    const { visible, delay } = this.props;
    if (!visible) return;
    setTimeout(() => {
      this.setState({ visible: true });
    }, delay);
  }

  render() {
    const { style, message, onPress, actionText } = this.props;
    const { visible } = this.state;
    return (
      <RNSnackBar
        visible={visible}
        textMessage={message}
        actionHandler={onPress}
        actionText={actionText}
        backgroundColor={style && style.backgroundColor}
        messageColor={style && style.color}
        accentColor={style && style.actionColor}
      />
    );
  }
}

export default connectStyle("SnackBar", {})(SnackBar);
