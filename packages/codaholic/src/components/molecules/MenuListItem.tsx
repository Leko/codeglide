import * as React from "react";
import { TouchableOpacity } from "react-native";
import { connectStyle } from "@shoutem/theme";
import ListItem from "./ListItem";
import Row from "./Row";
import Icon from "../atoms/Icon";

export type Props = {
  onPress: () => any;
  dimmed: boolean;
  children: React.ReactNode;
};

export const MenuListItem = ({ onPress, dimmed, children }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <ListItem>
      <Row
        style={{
          flex: 1
        }}
      >
        {children}
      </Row>
      <Icon name="chevron-right" styleName={dimmed ? "dimmed" : ""} />
    </ListItem>
  </TouchableOpacity>
);

export default connectStyle("MenuListItem", {})(MenuListItem);
