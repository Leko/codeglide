import React from "react";
import { ScrollView } from "react-native";
import {
  NavigationScreenOptions,
  NavigationScreenProp
} from "react-navigation";
import { View } from "@shoutem/ui";
import Histories from "../organisms/Histories";
import Button from "../molecules/Button";
import { History as HistoryType } from "../../modules/searchHistory/state";

type Props = {
  navigation: NavigationScreenProp<void>;
  histories: Array<HistoryType>;
};

const SearchHistories = ({ navigation, histories }: Props) => (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ flex: 1, padding: 10 }}>
      <Histories
        histories={histories}
        onPress={(h: HistoryType) =>
          navigation.navigate("Dashboard", {
            openSearch: true,
            searchParams: h.query
          })
        }
      />
    </ScrollView>
  </View>
);

const navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<void>;
}): NavigationScreenOptions => ({
  title: "Search history",
  headerLeft: () => (
    <Button
      styleName="icon"
      icon="chevron-left"
      onPress={() => navigation.goBack()}
    />
  )
});

export default Object.assign(SearchHistories, { navigationOptions });
