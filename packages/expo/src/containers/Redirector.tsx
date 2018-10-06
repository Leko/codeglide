import * as React from "react";
import { connect } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import { State } from "../modules/state";
import { selectors } from "../modules/user";

type Props = {
  boarded: boolean;
  navigation: NavigationScreenProp<any, void>;
};

class Redirector extends React.PureComponent<Props> {
  componentDidMount() {
    const { boarded, navigation } = this.props;
    if (boarded) {
      navigation.navigate("MemberStack");
    } else {
      navigation.navigate("GuestStack");
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: State) => ({
  boarded: selectors.isBoarded(state)
});

export default connect(mapStateToProps)(Redirector);
