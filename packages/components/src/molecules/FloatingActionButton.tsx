import * as React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, Theme } from "@material-ui/core/styles";

type Props = {
  children: React.ReactNode;
  onPress: () => void;
  classes?: {
    container: string;
  };
};

export const FloatingActionButton = ({ children, classes, onPress }: Props) => (
  <div className={classes!.container}>
    <Button variant="fab" color="primary" aria-label="Search" onClick={onPress}>
      {children}
    </Button>
  </div>
);

const styles = (theme: Theme) => ({
  container: {
    position: "fixed" as "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(FloatingActionButton);
