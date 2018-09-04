import * as React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-navigation";
import { View } from "@shoutem/ui";
import { connectStyle } from "@shoutem/theme";

interface IStyle {
  container: Object;
  scrollable: Object;
}

type Props = {
  children: React.ReactNode;
  style?: IStyle;
};

export const Container = ({ children }: Props) => (
  <View style={{}}>
    <ScrollView style={{}}>{children}</ScrollView>
  </View>
);

export default connectStyle("Container", {})(Container);
