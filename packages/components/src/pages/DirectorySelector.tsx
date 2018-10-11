import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { ShallowTree, TreeEntry, omitFile } from "@codeglide/domain";
import { FileList } from "../molecules/FileList";
import Page from "../templates/Page";

type Props = {
  onSelect: (path: TreeEntry) => void;
  loading?: boolean;
  tree: ShallowTree;
};

export const DirectorySelector: React.SFC<Props> = ({
  tree,
  loading = false,
  onSelect
}: Props) => (
  <Page
    title="Choose repository"
    renderHeaderLeft={() => (
      <IconButton color="inherit" aria-label="Menu">
        <NavigateBeforeIcon />
      </IconButton>
    )}
  >
    {loading ? (
      <FileList placeholder tree={[]} onPress={onSelect} />
    ) : tree.length > 0 ? (
      <FileList tree={omitFile(tree)} onPress={onSelect} />
    ) : (
      // FIXME
      <span>Directory is empty</span>
    )}
  </Page>
);
