import { connect } from "react-redux";
import { Dashboard } from "@codeglide/components";

const mapStateToProps = () => ({
  searchHistory: [],
  repositoryHistory: []
});
const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
