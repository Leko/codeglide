import { connect } from "react-redux";
import { Dashboard } from "@codeglide/components";
import { history } from "../history";

const mapStateToProps = () => ({
  searchHistory: [],
  repositoryHistory: []
});
const mapDispatchToProps = () => ({
  onRequestSearch() {
    history.push("/search");
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
