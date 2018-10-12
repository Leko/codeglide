import * as React from "react";
import Avatar from "@material-ui/core/Avatar";

type Props = {
  owner: string;
};

export const GitHubAvatar = ({ owner }: Props) => (
  <Avatar src={`https://github.com/${owner}.png?size=120`} />
);
