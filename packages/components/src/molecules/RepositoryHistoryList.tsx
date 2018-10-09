import * as React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import { RepositoryHistory, Repository } from "@codeglide/domain";
import { DistanceToNow } from "../atoms/DistanceToNow";

type Props = {
  repositories: ReadonlyArray<RepositoryHistory>;
  onPress: (history: Repository) => void;
};

export const RepositoryHistoryList = ({ repositories, onPress }: Props) => (
  <List subheader={<ListSubheader>Open recent</ListSubheader>}>
    {repositories.map((history: RepositoryHistory) => (
      <ListItem
        key={history.digest}
        button
        onClick={() => onPress(history.repository)}
      >
        <Avatar
          src={`https://github.com/${history.repository.owner}.png?size=120`}
        />
        <ListItemText
          inset
          primary={`${history.repository.owner}/${
            history.repository.repository
          }`}
          secondary={<DistanceToNow date={new Date(history.lastOpenedAt)} />}
        />
      </ListItem>
    ))}
  </List>
);
