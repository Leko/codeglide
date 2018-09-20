import * as React from "react";
import { connect } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import { State } from "../modules/state";
import { selectors } from "../modules/user";

type Props = {
  credential: string | null;
  navigation: NavigationScreenProp<any, void>;
};

class Redirector extends React.PureComponent<Props> {
  componentDidMount() {
    // const { credential, navigation } = this.props;
    // if (credential) {
    //   navigation.replace("MemberStack");
    // } else {
    //   navigation.replace("GuestStack");
    // }
    const { navigation } = this.props;
    navigation.replace("MemberStack");
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: State) => ({
  credential: selectors.getCredential(state)
});

export default connect(mapStateToProps)(Redirector);
