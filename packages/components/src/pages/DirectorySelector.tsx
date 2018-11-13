import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import {
  Repository,
  ShallowTree,
  TreeEntry,
  omitFile
} from "@codeglide/domain";
import { BackButton } from "../molecules/BackButton";
import { FileList } from "../molecules/FileList";
import PathBreadcrumb from "../molecules/PathBreadcrumb";
import Page from "../templates/Page";

export type Props = {
  repository: Repository;
  paths: Array<string>;
  onSelect: (repository: Repository, entry: TreeEntry) => void;
  onRequestMore: (repository: Repository, entry: TreeEntry) => void;
  onRequestPath: (repository: Repository, path: string) => void;
  onRequestBack: () => void;
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
    const { onSelect, repository } = this.props;
    if (!selectedEntry) {
      return;
    }
    onSelect(repository, selectedEntry);
  };

  componentDidMount() {
    const { onRequestPath, repository } = this.props;
    // TODO: with initial state
    onRequestPath(repository, "/");
  }

  render() {
    const { selectedEntry } = this.state;
    const {
      tree,
      repository,
      loading,
      paths,
      onRequestBack,
      onRequestMore,
      onRequestPath
    } = this.props;

    return (
      <Page
        title="Choose repository"
        renderHeaderLeft={() => <BackButton onPress={onRequestBack} />}
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
          <PathBreadcrumb
            paths={paths}
            onPress={(path: string) => onRequestPath(repository, path)}
          />
        ) : null}
        {loading ? (
          <FileList
            selectable
            placeholder
            tree={[]}
            selectedPath={selectedEntry ? selectedEntry.path : ""}
            onPress={this.handleSelect}
            onRequestMore={() => {}}
          />
        ) : tree.length > 0 ? (
          <FileList
            selectable
            tree={omitFile(tree)}
            selectedPath={selectedEntry ? selectedEntry.path : ""}
            onPress={this.handleSelect}
            onRequestMore={(entry: TreeEntry) =>
              onRequestMore(repository, entry)
            }
          />
        ) : (
          // FIXME
          <span>Directory is empty</span>
        )}
      </Page>
    );
  }
}
