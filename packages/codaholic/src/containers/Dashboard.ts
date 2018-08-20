import { connect } from "react-redux";
import Dashboard from "../components/pages/Dashboard";
import { searchCode } from "../usecases";
import { SearchParams } from "../usecases/searchCode";

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  search(params: SearchParams) {
    dispatch(searchCode(params));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
