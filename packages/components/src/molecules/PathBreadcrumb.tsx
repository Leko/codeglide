import * as React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Text } from "../atoms/Text";
import { Row } from "./Row";

type Props = {
  paths: Array<string>;
  onPress: (path: string) => void;
  classes?: {
    root: string;
    inner: string;
  };
};

const sep = "/";
export const PathBreadcrumb = ({ paths, onPress, classes }: Props) => (
  <div className={classes!.root}>
    <Row className={classes!.inner}>
      <Text>{sep}</Text>
      {paths.map((p, i) => (
        <React.Fragment>
          <Button
            size="small"
            onClick={() => onPress(sep + paths.slice(0, i + 1).join(sep))}
          >
            {p}
          </Button>
          <Text>{sep}</Text>
        </React.Fragment>
      ))}
    </Row>
  </div>
);

const styles = {
  root: {
    maxWidth: "100%",
    overflowX: "scroll" as "scroll"
  },
  inner: {
    padding: "0 10px"
  }
};

export default withStyles(styles)(PathBreadcrumb);
