import React from "react";
import { View, Button, TextInput } from "@shoutem/ui";
import { Subtitle } from "../atoms/Subtitle";
import { Heading } from "../atoms/Heading";
import { Caption } from "../atoms/Caption";
import { Text } from "../atoms/Text";
import Divider from "../atoms/Divider";
import Icon from "../atoms/Icon";
import Checkbox from "../molecules/Checkbox";
import Container from "../molecules/Container";
import SearchAccordion from "../organisms/SearchAccordion";
import { InnerProps } from "../organisms/SearchAccordion";
import { EmptyStatus } from "../atoms/EmptyStatus";

type Props = {};

const Row = ({ children }) => (
  <View
    style={{ flexDirection: "row", alignItems: "center", marginVertical: 12 }}
  >
    {children}
  </View>
);

const Dashboard = ({  }: Props) => (
  <Container>
    <SearchAccordion placeholder={"Quick search"}>
      {({ toggle }: InnerProps) => (
        <View styleName="container">
          <Row>
            <Subtitle style={{ flex: 1 }}>Filter</Subtitle>
            <Button styleName="clear" onPress={toggle}>
              <Icon name="close" />
            </Button>
          </Row>
          <Divider />
          <Row>
            <Heading style={{ flex: 1 }}>Repository</Heading>
            <View style={{ flex: 2 }}>
              <TextInput autoCorrect={false} placeholder="Leko/hothouse" />
            </View>
          </Row>
          <Divider />
          <Row>
            <Heading style={{ flex: 1 }}>Directory</Heading>
            <View style={{ flex: 2 }}>
              <TextInput autoCorrect={false} placeholder="__tests__" />
            </View>
          </Row>
          <Divider />
          <Row>
            <Heading style={{ flex: 1 }}>Language</Heading>
            <View style={{ flex: 2 }}>
              <TextInput autoCorrect={false} placeholder="JavaScript" />
            </View>
          </Row>
          <Divider />
          <Row>
            <Heading style={{ flex: 1 }}>Include fork</Heading>
            <View style={{ flex: 2 }}>
              <Checkbox styleName="dimmed" onChange={() => {}} />
            </View>
          </Row>
          <Divider />
          <Row>
            <Heading style={{ flex: 1 }}>Extension</Heading>
            <View style={{ flex: 2 }}>
              <TextInput autoCorrect={false} placeholder="js" />
            </View>
          </Row>
          <Divider />
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

export default Dashboard;
