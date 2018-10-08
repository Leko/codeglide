import * as React from "react";
import Typography from "@material-ui/core/Typography";

type Props = {
  children: React.ReactText;
};

export const Text = ({ children }: Props) => (
  <Typography color="inherit">{children}</Typography>
);
