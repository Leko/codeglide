import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
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

export const Container = ({ style, children }: Props) => (
  <View style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connectStyle("Container", {})(Container);
