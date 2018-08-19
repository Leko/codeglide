import { connect } from 'react-redux'
import Welcome from "../components/pages/Welcome";
import loginWithGithub from "../usecases/loginWithGithub";

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch: any) => ({
  onRequestLogin() {
    dispatch(loginWithGithub())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
