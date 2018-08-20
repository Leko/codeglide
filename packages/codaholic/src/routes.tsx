import React from "react";
import { connectStyle } from "@shoutem/theme";
import {
  createStackNavigator,
  createDrawerNavigator,
  NavigationStackScreenOptions
} from "react-navigation";
import Redirector from "./containers/Redirector";
import Welcome from "./containers/Welcome";
import Dashboard from "./containers/Dashboard";

interface IStyle {
  tintColor: string;
  header: Object;
  title: Object;
}
type Props = {
  style: IStyle;
};

const Routes = ({ style }: Props) => {
  const navigationOptions: NavigationStackScreenOptions = {
    headerStyle: style.header,
    headerTintColor: style.tintColor,
    headerTitleStyle: style.title,
    gesturesEnabled: false
  };

  const MemberStack = createDrawerNavigator(
    {
      MemberRoot: createStackNavigator(
        {
          Dashboard
        },
        {
          initialRouteName: "Dashboard",
          navigationOptions
        }
      )
    },
    {
      initialRouteName: "MemberRoot",
      drawerWidth: 220,
      navigationOptions
    }
  );

  const GuestStack = createStackNavigator(
    {
      Welcome
    },
    {
      initialRouteName: "Welcome",
      headerMode: "none",
      navigationOptions
    }
  );

  const RootStack = createStackNavigator(
    {
      Redirector,
      MemberStack,
      GuestStack
    },
    {
      initialRouteName: "Redirector",
      headerMode: "none",
      navigationOptions
    }
  );

  return <RootStack />;
};

const defaultStyle = {};

export default connectStyle("NavBar", defaultStyle)(Routes);
