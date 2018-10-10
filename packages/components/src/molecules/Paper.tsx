import * as React from "react";
import PaperBase from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

type Props = {
  children: React.ReactNode;
  square?: boolean;
  elevation?: number;
  classes?: {
    paper: string;
  };
};

export const Paper = ({
  children,
  classes,
  square = true,
  elevation = 1
}: Props) => (
  <PaperBase square={square} elevation={elevation} className={classes!.paper}>
    {children}
  </PaperBase>
);

const styles = {
  paper: {
    padding: 10
  }
};

export default withStyles(styles)(Paper);
