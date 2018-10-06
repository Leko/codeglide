import * as React from "react";
import { connectStyle } from "@shoutem/theme";
import Divider from "../atoms/Divider";
import Row from "./Row";

interface IStyle {}

export type Props = {
  style?: IStyle;
  children: React.ReactNode;
};

export const ListItem = ({ style, children }: Props) => (
  <React.Fragment>
    <Row style={style}>{children}</Row>
    <Divider styleName="thin" />
  </React.Fragment>
);

export default connectStyle("ListItem", {})(ListItem);
