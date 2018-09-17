import React from "react";
import { TouchableHighlight } from "react-native";
import {
  NavigationScreenOptions,
  NavigationScreenProp
} from "react-navigation";
import { View } from "@shoutem/ui";
import { SwipeListView } from "react-native-swipe-list-view";
import History from "../molecules/History";
import ListItem from "../molecules/ListItem";
import Button from "../molecules/Button";
import BackdropButton from "../molecules/BackdropButton";
import { History as HistoryType } from "../../modules/searchHistory/state";

type Props = {
  navigation: NavigationScreenProp<void>;
  histories: Array<HistoryType>;
  removeHistory: (history: HistoryType) => any;
};

const SearchHistories = ({ navigation, histories, removeHistory }: Props) => (
  <View style={{ flex: 1 }}>
    <SwipeListView
      useFlatList
      disableRightSwipe
      data={histories.map((h: HistoryType) => ({ ...h, key: h.digest }))}
      renderItem={({ item: history }: { item: HistoryType }) => (
        <TouchableHighlight
          onPress={() =>
            navigation.navigate("Dashboard", {
              openSearch: true,
              searchParams: history.query
            })
          }
        >
          <View>
            <ListItem key={history.digest}>
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <History history={history} />
              </View>
            </ListItem>
          </View>
        </TouchableHighlight>
      )}
      renderHiddenItem={({ item: history }: { item: HistoryType }) => (
        <View style={{ alignItems: "flex-end" }}>
          <BackdropButton
            styleName="destructive"
            onPress={() => removeHistory(history)}
          >
            Remove
          </BackdropButton>
        </View>
      )}
      rightOpenValue={-75}
    />
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
