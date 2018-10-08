import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { AppBarTitle } from "../atoms/AppBarTitle";

type Props = {
  title: string;
  children: React.ReactNode;
  renderHeaderLeft?: () => React.ReactNode;
  renderHeaderRight?: () => React.ReactNode;
  classes?: {
    container: string;
    title: string;
  };
};

export const Page: React.SFC<Props> = ({
  classes,
  renderHeaderLeft,
  renderHeaderRight,
  title,
  children
}: Props) => (
  <React.Fragment>
    <AppBar position="static">
      <Toolbar variant="dense">
        {renderHeaderLeft!()}
        <AppBarTitle className={classes!.title}>{title}</AppBarTitle>
        {renderHeaderRight!()}
      </Toolbar>
    </AppBar>
    <div className={classes!.container}>{children}</div>
  </React.Fragment>
);

Page.defaultProps = {
  renderHeaderLeft: () => null,
  renderHeaderRight: () => null
};

const styles = {
  container: {
    padding: "20px 10px"
  },
  title: {
    flexGrow: 1
  }
};

export default withStyles(styles)(Page);
