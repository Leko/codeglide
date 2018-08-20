import * as React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { connectStyle } from "@shoutem/theme";
import { version } from "../../../package.json";
import Divider from "../atoms/Divider";
import { Subtitle } from "../atoms/Subtitle";
import { Caption } from "../atoms/Caption";
import { Text } from "../atoms/Text";
import Row from "../molecules/Row";
import MenuListItem from "../molecules/MenuListItem";

interface IStyle {
  container: Object;
  safeArea: Object;
}

export type Props = {
  style?: IStyle;
};

// FIXME: Create new molecules
export const Drawer = ({ style }: Props) => (
  <SafeAreaView style={[styles.container, style && style.container]}>
    <View style={[styles.container, style && style.safeArea]}>
      <Row style={{ paddingVertical: 10 }}>
        <Subtitle style={flex}>Codaholic</Subtitle>
        <Text>{version}</Text>
      </Row>
      <Divider styleName="thin" />
      <View style={flex}>
        <MenuListItem>
          <Caption>Settings</Caption>
        </MenuListItem>
      </View>
      <MenuListItem dimmed>
        <Text>Terms</Text>
      </MenuListItem>
      <MenuListItem dimmed>
        <Text>Privacy</Text>
      </MenuListItem>
      <MenuListItem dimmed>
        <Text>Sign out</Text>
      </MenuListItem>
    </View>
  </SafeAreaView>
);

const flex = {
  flex: 1
};
const styles = StyleSheet.create({
  container: {
    ...flex
  }
});

export default connectStyle("Drawer", {})(Drawer);
