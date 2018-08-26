import React from "react";
import {
  NavigationScreenOptions,
  NavigationScreenProp
} from "react-navigation";
import { View } from "@shoutem/ui";
import { Subtitle } from "../atoms/Subtitle";
import { Caption } from "../atoms/Caption";
import { Text } from "../atoms/Text";
import { EmptyStatus } from "../atoms/EmptyStatus";
import Button from "../molecules/Button";
import Container from "../molecules/Container";
import { SearchParams } from "../../usecases/searchCode";
import { Result } from "../../modules/codeSearch";
import Search from "./Search";

type Params = {
  openSearch?: boolean;
  searchParams?: {
    repo: string;
    user: string;
  };
};
type Props = {
  navigation: NavigationScreenProp<Params>;
  busy: boolean;
  total: number;
  current: number;
  results: Array<Result>;
  search: (params: SearchParams) => void;
};

const Dashboard = ({
  busy,
  total,
  current,
  results,
  search,
  navigation
}: Props) => (
  <Container>
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
      busy={busy}
      total={total}
      current={current}
      results={results}
    />
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <EmptyStatus />
      <Subtitle>History is empty</Subtitle>
      <Text>Let's try your first search</Text>
      <Button styleName="secondary">
        <Caption>Try it</Caption>
      </Button>
    </View>
  </Container>
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
