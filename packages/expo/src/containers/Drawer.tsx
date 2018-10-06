import { connect } from "react-redux";
import { version } from "../../package.json";
import Drawer from "../components/organisms/Drawer";
import { creators, selectors } from "../modules/user";
import { State } from "../modules/state";
import loginWithGithub from "../usecases/loginWithGithub";

const mapStateToProps = (state: State) => ({
  version,
  credential: selectors.getCredential(state),
  avatarUrl: selectors.getAvatarUrl(state),
  displayName: selectors.getDisplayName(state)
});
const mapDispatchToProps = (dispatch: any) => ({
  onPressSignIn() {
    dispatch(loginWithGithub());
  },
  onPressSignOut() {
    dispatch(creators.logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);
