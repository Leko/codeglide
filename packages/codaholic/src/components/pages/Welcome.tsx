import React from "react";
import { Button, Text } from "react-native";
import { Container } from "../molecules/Container";

type Props = {
  onRequestLogin: () => any,
};
const Welcome = ({ onRequestLogin }: Props) => (
  <Container>
    <Text>Codaholic</Text>
    <Button title="Signin with GitHub" onPress={onRequestLogin} />
  </Container>
);

export default Welcome
