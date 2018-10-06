import * as React from "react";
import { Constants } from "expo";
import { SafeAreaView, View, Image, StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";
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
  navigation: NavigationScreenProp<any, void>;
  version: string;
  credential: string | null;
  avatarUrl: string | null;
  displayName: string | null;
  onPressSignIn: () => void;
  onPressSignOut: () => void;
};

// FIXME: Create new molecules
export const Drawer = ({
  style,
  navigation,
  version,
  credential,
  avatarUrl,
  displayName,
  onPressSignIn,
  onPressSignOut
}: Props) => (
  <SafeAreaView style={[styles.container, style && style.container]}>
    <View style={[styles.container, style && style.safeArea]}>
      <Row style={{ paddingVertical: 10 }}>
        <Subtitle style={flex}>CodeGlide</Subtitle>
        <Text>
          {version}({Constants.manifest.releaseChannel || "default"})
        </Text>
      </Row>
      <Divider styleName="thin" />
      <View style={flex}>
        {credential ? (
          <Row style={{ paddingVertical: 10 }}>
            <Image
              style={styles.avatar}
              source={{
                uri:
                  avatarUrl ||
                  "https://www.gravatar.com/avatar/x?f=y&s=200&d=retro"
              }}
            />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Caption>{displayName || "Anonymous"}</Caption>
            </View>
          </Row>
        ) : (
          <MenuListItem onPress={onPressSignIn} dimmed disabled>
            <Text>Sign in with GitHub (WIP)</Text>
          </MenuListItem>
        )}
      </View>
      <MenuListItem dimmed onPress={() => navigation.navigate("GuestStack")}>
        <Text>Usage</Text>
      </MenuListItem>
      <MenuListItem dimmed onPress={() => {}}>
        <Text>Terms (WIP)</Text>
      </MenuListItem>
      <MenuListItem dimmed onPress={() => {}}>
        <Text>Privacy (WIP)</Text>
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
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40
  }
});

export default connectStyle("Drawer", {})(Drawer);
