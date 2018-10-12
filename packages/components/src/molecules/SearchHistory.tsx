import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { SearchHistory as SearchHistoryType } from "@codeglide/domain";
import { DistanceToNow } from "../atoms/DistanceToNow";
import { GitHubAvatar } from "../atoms/GitHubAvatar";

type Props = {
  history: SearchHistoryType;
  onPress: () => void;
};

export const SearchHistory = ({
  onPress,
  history: { query, searchedAt }
}: Props) => (
  <ListItem button onClick={onPress}>
    <GitHubAvatar owner={query.repo.owner} />
    <ListItemText
      primary={`"${query.q}" in ${query.repo}`}
      secondary={<DistanceToNow date={new Date(searchedAt)} />}
    />
  </ListItem>
);
