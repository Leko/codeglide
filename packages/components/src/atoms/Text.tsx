import * as React from "react";
import Typography from "@material-ui/core/Typography";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Text = ({ children, className }: Props) => (
  <Typography color="inherit" className={className}>
    {children}
  </Typography>
);
