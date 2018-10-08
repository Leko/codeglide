import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

type Props = {
  title: string;
  children: React.ReactNode;
  classes: {
    container: string;
  };
};

export const Page = ({ classes, title, children }: Props) => (
  <React.Fragment>
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.container}>{children}</div>
  </React.Fragment>
);

const styles = {
  container: {
    padding: "20px 10px"
  }
};

export default withStyles(styles)(Page);
