import * as React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Repository } from "@codeglide/domain";
import { Placeholder, RoundShape, TextBlock } from "./Placeholder";
import { GitHubAvatar } from "../atoms/GitHubAvatar";

type Props = {
  placeholder?: boolean;
  repositories: ReadonlyArray<Repository>;
  onPress: (repository: Repository) => void;
};

export const RepositoryList = ({
  placeholder = false,
  repositories,
  onPress
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
      {repositories.map((repository: Repository) => (
        <ListItem
          key={`${repository.owner}/${repository.repository}`}
          button
          onClick={() => onPress(repository)}
        >
          <GitHubAvatar owner={repository.owner} />
          <ListItemText
            inset
            primary={`${repository.owner}/${repository.repository}`}
          />
        </ListItem>
      ))}
    </List>
  </Placeholder>
);
