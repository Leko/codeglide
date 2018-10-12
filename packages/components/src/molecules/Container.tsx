import * as React from "react";
import { withStyles } from "@material-ui/core/styles";

type Props = {
  children: React.ReactNode;
  last?: boolean;
  classes?: {
    container: string;
    last: string;
  };
};

export const Container: React.SFC<Props> = ({
  children,
  classes,
  last = true
}: Props) => (
  <div className={[classes!.container, last ? classes!.last : ""].join(" ")}>
    {children}
  </div>
);

const styles = {
  container: {
    padding: "20px 10px 0"
  },
  last: {
    paddingBottom: "20px"
  }
};

export default withStyles(styles)(Container);
