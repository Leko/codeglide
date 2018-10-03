import React from "react";
import { ScrollView } from "react-native";
import {
  NavigationScreenOptions,
  NavigationScreenProp
} from "react-navigation";
import uniq from "lodash/uniq";
import { View } from "@shoutem/ui";
import { Subtitle } from "../atoms/Subtitle";
import { Caption } from "../atoms/Caption";
import { Text } from "../atoms/Text";
import { EmptyStatus } from "../atoms/EmptyStatus";
import Button from "../molecules/Button";
import Histories from "../organisms/Histories";
import { SearchParams } from "../../usecases/searchCode";
import { Result } from "../../modules/codeSearch";
import Search from "./Search";
import { DetailRequest, Values } from "./Search";
import { History as HistoryType } from "../../modules/searchHistory/state";

type Params = {
  openSearch?: boolean;
  searchParams?: Values;
};
type Props = {
  navigation: NavigationScreenProp<Params>;
  busy: boolean;
  total: number;
  current: number;
  results: Array<Result>;
  histories: Array<HistoryType>;
  search: (params: SearchParams) => void;
};

const NUM_TO_RENDER_HISTORY = 5;

const Dashboard = ({
  busy,
  total,
  current,
  results,
  histories,
  search,
  navigation
}: Props) => (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Search
          open={navigation.state.params && navigation.state.params.openSearch}
          defaultValues={
            navigation.state.params && navigation.state.params.searchParams
              ? navigation.state.params.searchParams
              : {}
          }
          onCancel={() =>
            navigation.setParams({ searchParams: null, openSearch: false })
          }
          onSubmit={(values: SearchParams) => search(values)}
          onRequestDetail={({
            repository,
            path,
            highlights
          }: DetailRequest) => {
            navigation.navigate("Preview", {
              repository,
              path,
              highlights: uniq(highlights.map(w => w.toLowerCase())).join(",")
            });
          }}
          busy={busy}
          total={total}
          current={current}
          results={results}
        />
        <View style={{ padding: 10 }}>
          {histories.length > 0 ? (
            <React.Fragment>
              <Subtitle>Search history</Subtitle>
              <Histories
                histories={histories.slice(0, NUM_TO_RENDER_HISTORY)}
                onPress={(h: HistoryType) =>
                  navigation.setParams({
                    openSearch: true,
                    searchParams: h.query
                  })
                }
              />
              {histories.length > NUM_TO_RENDER_HISTORY && (
                <View style={{ alignItems: "flex-end" }}>
                  <Button
                    onPress={() => navigation.navigate("SearchHistories")}
                    rightIcon="chevron-right"
                    styleName="icon"
                  >
                    <Caption>View all</Caption>
                  </Button>
                </View>
              )}
            </React.Fragment>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Subtitle>Let's search!</Subtitle>
              <Caption>
                1. Copy repository URL from your browser
                {"\n"}
                2. Come back to CodeGlide
              </Caption>
              <View
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Caption>Or</Caption>
                <Button
                  icon="search"
                  // styleName="primary"
                  styleName="secondary"
                  onPress={() => navigation.setParams({ openSearch: true })}
                >
                  <Caption>Search in scratch</Caption>
                </Button>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  </View>
);

const navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<Params>;
}): NavigationScreenOptions => ({
  title: "Dashboard",
  headerLeft: () => (
    <Button
      styleName="icon"
      icon="menu"
      onPress={() => navigation.openDrawer()}
    />
  )
});

export default Object.assign(Dashboard, { navigationOptions });
