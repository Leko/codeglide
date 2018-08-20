import React from "react";
import {
  NavigationScreenOptions,
  NavigationScreenProp
} from "react-navigation";
import { View, TextInput } from "@shoutem/ui";
import { Subtitle } from "../atoms/Subtitle";
import { Heading } from "../atoms/Heading";
import { Caption } from "../atoms/Caption";
import { Text } from "../atoms/Text";
import Button from "../molecules/Button";
import ListItem from "../molecules/ListItem";
import Checkbox from "../molecules/Checkbox";
import Container from "../molecules/Container";
import SearchAccordion from "../organisms/SearchAccordion";
import { InnerProps } from "../organisms/SearchAccordion";
import { EmptyStatus } from "../atoms/EmptyStatus";
import { SearchParams } from "../../usecases/searchCode";

type Props = {
  search: (params: SearchParams) => void;
};

const Dashboard = ({ search }: Props) => (
  <Container>
    <SearchAccordion placeholder={"Quick search"} onSubmit={() => search({})}>
      {({ toggle }: InnerProps) => (
        <View styleName="container">
          <ListItem>
            <Subtitle style={{ flex: 1 }}>Filter</Subtitle>
            <Button styleName="icon" onPress={toggle} icon="close" />
          </ListItem>
          <ListItem>
            <Caption style={{ flex: 1 }}>Repository</Caption>
            <View style={{ flex: 2 }}>
              <TextInput autoCorrect={false} placeholder="Leko/hothouse" />
            </View>
          </ListItem>
          <ListItem>
            <Caption style={{ flex: 1 }}>Directory</Caption>
            <View style={{ flex: 2 }}>
              <TextInput autoCorrect={false} placeholder="__tests__" />
            </View>
          </ListItem>
          <ListItem>
            <Caption style={{ flex: 1 }}>Language</Caption>
            <View style={{ flex: 2 }}>
              <TextInput autoCorrect={false} placeholder="JavaScript" />
            </View>
          </ListItem>
          <ListItem>
            <Caption style={{ flex: 1 }}>Include fork</Caption>
            <View style={{ flex: 2 }}>
              <Checkbox styleName="dimmed" onChange={() => {}} />
            </View>
          </ListItem>
          <ListItem>
            <Caption style={{ flex: 1 }}>Extension</Caption>
            <View style={{ flex: 2 }}>
              <TextInput autoCorrect={false} placeholder="js" />
            </View>
          </ListItem>
        </View>
      )}
    </SearchAccordion>
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
  navigation: NavigationScreenProp<void>;
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
