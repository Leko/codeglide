import { connect } from "react-redux";
import Welcome from "../components/pages/Welcome";
import { creators } from "../modules/user";

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  onFinish() {
    dispatch(creators.completeOnBoarding(new Date()));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
