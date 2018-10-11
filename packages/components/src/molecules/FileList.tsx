import * as React from "react";
import sortBy from "lodash/sortBy";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Radio from "@material-ui/core/Radio";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FolderIcon from "@material-ui/icons/Folder";
import {
  ShallowTree,
  TreeEntry,
  isFile,
  fileTypeComparator
} from "@codeglide/domain";
import { getColorByPath } from "@codeglide/languages";
import { Circle } from "../atoms/Circle";
import { Placeholder, RoundShape, TextBlock } from "./Placeholder";

type Props = {
  tree: ShallowTree;
  onPress: (entry: TreeEntry) => void;
  onRequestMore?: (entry: TreeEntry) => void;
  placeholder?: boolean;
  selectable?: boolean;
  selectedPath?: string;
};

export const FileList = ({
  placeholder = false,
  selectable = false,
  tree,
  selectedPath,
  onPress,
  onRequestMore = () => {}
}: Props) => (
  <Placeholder
    ready={!placeholder}
    renderPlaceholder={() => (
      <List>
        {[0, 1, 2].map(n => (
          <ListItem key={n}>
            <Avatar>
              <RoundShape />
            </Avatar>
            <ListItemText inset primary={<TextBlock rows={1} />} />
          </ListItem>
        ))}
      </List>
    )}
  >
    <List>
      {sortBy(tree, fileTypeComparator).map((entry: TreeEntry) => (
        <ListItem key={entry.path} button onClick={() => onPress(entry)}>
          {isFile(entry) ? (
            <React.Fragment>
              {selectable ? (
                <Radio
                  checked={selectedPath === entry.path}
                  name="file-list-item"
                  aria-label={entry.path}
                />
              ) : (
                <Circle size={10} color={getColorByPath(entry.path)} />
              )}
              <ListItemText inset primary={entry.name} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {selectable ? (
                <Radio
                  checked={selectedPath === entry.path}
                  name="file-list-item"
                  aria-label={entry.path}
                />
              ) : (
                <Avatar>
                  <FolderIcon />
                </Avatar>
              )}
              <ListItemText inset primary={`${entry.name}/`} />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="More"
                  onClick={event => {
                    onRequestMore(entry);
                    event.stopPropagation();
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </React.Fragment>
          )}
        </ListItem>
      ))}
    </List>
  </Placeholder>
);
