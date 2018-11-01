import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

type Props = {
  onPress: () => void;
};

export const BackButton: React.SFC<Props> = ({ onPress }: Props) => (
  <IconButton color="inherit" aria-label="Menu" onClick={onPress}>
    <NavigateBeforeIcon />
  </IconButton>
);

export default withStyles({})(BackButton);
