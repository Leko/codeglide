import * as React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
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
    <SafeAreaView style={[styles.container, style && style.container]}>
      <ScrollView
        style={styles.container}
        // contentContainerStyle={style && style.scrollable}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connectStyle("Container", {})(Container);
