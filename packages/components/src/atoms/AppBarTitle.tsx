import * as React from "react";
import Typography from "@material-ui/core/Typography";

type Props = {
  className: string;
  children: React.ReactNode;
};

export const AppBarTitle = ({ className, children }: Props) => (
  <Typography variant="h6" color="inherit" className={className}>
    {children}
  </Typography>
);
