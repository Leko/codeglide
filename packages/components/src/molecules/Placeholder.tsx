import * as React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import ReactPlaceholder from "react-placeholder";
import {
  TextBlock as TextBlockBase,
  // MediaBlock,
  // TextRow,
  // RectShape,
  RoundShape as RoundShapeBase
} from "react-placeholder/lib/placeholders";
import "react-placeholder/lib/reactPlaceholder.css";

type Props = {
  ready: boolean;
  renderPlaceholder: () => React.ReactNode;
  children: React.ReactNode;
};

// https://github.com/buildo/react-placeholder#style
const styles = (theme: Theme) => ({
  round: {
    backgroundColor: theme.palette.grey[200],
    width: `40px !important`,
    height: `40px !important`
  },
  textBlock: {
    display: "flex" as "flex",
    alignItems: "flex-start" as "flex-start",
    flexDirection: "column" as "column"
  }
});
type Classes = {
  round: string;
  textBlock: string;
};

export const Placeholder = ({ children, renderPlaceholder, ready }: Props) => (
  <ReactPlaceholder
    ready={ready}
    customPlaceholder={renderPlaceholder()}
    className="show-loading-animation"
  >
    {children}
  </ReactPlaceholder>
);

const RoundShapeComponent = ({ classes }: { classes?: Classes }) => (
  <RoundShapeBase
    color={""}
    className={`show-loading-animation ${classes!.round}`}
  />
);
const TextBlockComponent = ({
  rows,
  inverted = false,
  classes
}: {
  rows: number;
  inverted?: boolean;
  classes?: Classes;
}) => (
  <TextBlockBase
    rows={rows}
    className={`show-loading-animation ${classes!.textBlock} ${
      inverted ? "text-block--inverted" : ""
    }`}
  />
);

export const RoundShape = withStyles(styles)(RoundShapeComponent);
export const TextBlock = withStyles(styles)(TextBlockComponent);
