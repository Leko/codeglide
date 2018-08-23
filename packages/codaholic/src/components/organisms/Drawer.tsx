import * as React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { connectStyle } from "@shoutem/theme";
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
  version: string;
  credential: string;
  onPressSignOut: string;
};

// FIXME: Create new molecules
export const Drawer = ({
  style,
  version,
  credential,
  onPressSignOut
}: Props) => (
  <SafeAreaView style={[styles.container, style && style.container]}>
    <View style={[styles.container, style && style.safeArea]}>
      <Row style={{ paddingVertical: 10 }}>
        <Subtitle style={flex}>Codaholic</Subtitle>
        <Text>{version}</Text>
      </Row>
      <Divider styleName="thin" />
      <View style={flex}>
        <MenuListItem onPress={() => {}}>
          <Caption>Settings</Caption>
        </MenuListItem>
      </View>
      <MenuListItem dimmed onPress={() => {}}>
        <Text>Terms</Text>
      </MenuListItem>
      <MenuListItem dimmed onPress={() => {}}>
        <Text>Privacy</Text>
      </MenuListItem>
      {credential && (
        <MenuListItem dimmed onPress={onPressSignOut}>
          <Text>Sign out</Text>
        </MenuListItem>
      )}
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
