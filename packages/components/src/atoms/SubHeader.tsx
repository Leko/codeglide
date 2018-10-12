import * as React from "react";
import Typography from "@material-ui/core/Typography";

type Props = {
  children: React.ReactNode;
};

export const SubHeader = ({ children }: Props) => (
  <Typography variant="h6" color="inherit">
    {children}
  </Typography>
);
