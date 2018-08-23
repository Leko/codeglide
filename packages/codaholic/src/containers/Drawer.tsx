import { connect } from "react-redux";
import { version } from "../../package.json";
import Drawer from "../components/organisms/Drawer";
import { creators } from "../modules/user";
import { State } from "../modules";
import getCredential from "../selectors/getCredential";

const mapStateToProps = (state: State) => ({
  version,
  credential: getCredential(state)
});
const mapDispatchToProps = (dispatch: any) => ({
  onPressSignOut() {
    dispatch(creators.logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);
