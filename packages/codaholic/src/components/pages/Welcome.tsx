import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { View } from "@shoutem/ui";
import { Subtitle } from "../atoms/Subtitle";
import { Caption } from "../atoms/Caption";
import { Construction } from "../atoms/Construction";
import { SodaLoading } from "../atoms/SodaLoading";
import { BrowseWindow } from "../atoms/BrowseWindow";
import Button from "../molecules/Button";
import Swiper from "react-native-swiper";

type Props = {
  onFinish: () => any;
  navigation: NavigationScreenProp<any, void>;
};
const Welcome = ({ onFinish, navigation }: Props) => (
  <View style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1 }}>
      <Swiper loop={false}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: 20,
            paddingHorizontal: 20
          }}
        >
          <Construction />
          <View style={{ marginTop: 60, marginBottom: 20 }}>
            <Subtitle>CodeGlide is work in progress</Subtitle>
          </View>
          <Caption>
            Thanks for join the closed beta.
            {"\n"}
            Please feel free to contact me if you got an any trouble.
          </Caption>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: 20,
            paddingHorizontal: 20
          }}
        >
          <BrowseWindow />
          <View style={{ marginTop: 60, marginBottom: 20 }}>
            <Subtitle>CodeGlide optimize to read the code</Subtitle>
          </View>
          <Caption>
            Main features
            {"\n"}* Faster than web browser
            {"\n"}* Search repository from clipboard
            {"\n"}* Code extensions
            {"\n"}* Search history
          </Caption>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: 20,
            paddingHorizontal: 20
          }}
        >
          <SodaLoading />
          <View style={{ marginTop: 60, marginBottom: 20 }}>
            <Subtitle>CodeGlide is NOT a full-featured GitHub client</Subtitle>
          </View>
          <Caption>
            CodeGlide not supported
            {"\n"}* Review pull requests
            {"\n"}* Search issue or pull request
            {"\n"}* Write code
          </Caption>
          <View style={{ marginTop: 10 }}>
            <Button
              styleName="primary"
              onPress={() => {
                onFinish();
                navigation.navigate("MemberRoot");
              }}
            >
              <Caption>START</Caption>
            </Button>
          </View>
        </View>
      </Swiper>
    </SafeAreaView>
  </View>
);

export default Welcome;
