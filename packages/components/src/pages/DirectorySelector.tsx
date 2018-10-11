import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import DoneIcon from "@material-ui/icons/Done";
import { ShallowTree, TreeEntry, omitFile } from "@codeglide/domain";
import { FileList } from "../molecules/FileList";
import PathBreadcrumb from "../molecules/PathBreadcrumb";
import Page from "../templates/Page";

type Props = {
  onSelect: (path: TreeEntry) => void;
  onRequestMore: (path: TreeEntry) => void;
  loading?: boolean;
  tree: ShallowTree;
};
type State = {
  selectedEntry: TreeEntry | null;
};
export class DirectorySelector extends React.Component<Props, State> {
  public static defaultProps = {
    loading: false
  };

  state: State = {
    selectedEntry: null
  };

  handleSelect = (entry: TreeEntry) => {
    this.setState({
      selectedEntry: entry
    });
  };

  handleDone = () => {
    const { selectedEntry } = this.state;
    const { onSelect } = this.props;
    if (!selectedEntry) {
      return;
    }
    onSelect(selectedEntry);
  };

  getPaths(): Array<string> | null {
    const { tree } = this.props;
    if (tree.length === 0) {
      return null;
    }

    return tree[0].path.split("/").slice(0, -1);
  }

  render() {
    const { selectedEntry } = this.state;
    const { tree, loading, onRequestMore } = this.props;
    const paths = this.getPaths();

    return (
      <Page
        title="Choose repository"
        renderHeaderLeft={() => (
          <IconButton color="inherit" aria-label="Menu">
            <NavigateBeforeIcon />
          </IconButton>
        )}
        renderHeaderRight={() => (
          <IconButton
            color="inherit"
            aria-label="Menu"
            disabled={!selectedEntry}
            onClick={this.handleDone}
          >
            <DoneIcon />
          </IconButton>
        )}
      >
        {paths !== null ? (
          <PathBreadcrumb paths={paths} onPress={() => {}} />
        ) : null}
        {loading ? (
          <FileList
            selectable
            placeholder
            tree={[]}
            selectedPath={selectedEntry ? selectedEntry.path : ""}
            onPress={this.handleSelect}
            onRequestMore={onRequestMore}
          />
        ) : tree.length > 0 ? (
          <FileList
            selectable
            tree={omitFile(tree)}
            selectedPath={selectedEntry ? selectedEntry.path : ""}
            onPress={this.handleSelect}
            onRequestMore={onRequestMore}
          />
        ) : (
          // FIXME
          <span>Directory is empty</span>
        )}
      </Page>
    );
  }
}
