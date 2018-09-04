import React from "react";
import { connectStyle } from "@shoutem/theme";
import {
  NavigationComponent,
  createStackNavigator,
  createDrawerNavigator,
  NavigationStackScreenOptions,
  NavigationScreenProp
} from "react-navigation";
import * as NavigationService from "./libs/NavigationService";
import Redirector from "./containers/Redirector";
import Welcome from "./containers/Welcome";
import Dashboard from "./containers/Dashboard";
import SearchHistories from "./containers/SearchHistories";
import Preview from "./containers/Preview";
import Drawer from "./containers/Drawer";

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
    headerTitleStyle: style.title
  };

  const MemberRoot = createStackNavigator(
    {
      Dashboard,
      SearchHistories,
      Preview
    },
    {
      // initialRouteName: "Preview",
      // initialRouteParams: {
      //   repository: "Leko/hothouse",
      //   path: "package.json",
      //   highlights: ["{"].join(",")
      // },
      initialRouteName: "Dashboard",
      navigationOptions
    }
  );
  // https://reactnavigation.org/docs/en/navigation-options-resolution.html#a-drawer-has-a-stack-inside-of-it-and-you-want-to-lock-the-drawer-on-certain-screens
  MemberRoot.navigationOptions = ({
    navigation: {
      state: { index }
    }
  }: {
    navigation: NavigationScreenProp<any>;
  }) => ({
    drawerLockMode: index > 0 ? "locked-closed" : "unlocked"
  });

  const MemberStack = createDrawerNavigator(
    {
      MemberRoot
    },
    {
      initialRouteName: "MemberRoot",
      drawerWidth: 220,
      contentComponent: Drawer,
      drawerBackgroundColor: "transparent",
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

  return (
    <RootStack
      ref={(ref: NavigationComponent) => {
        NavigationService.set(ref);
      }}
    />
  );
};

const defaultStyle = {};

export default connectStyle("NavBar", defaultStyle)(Routes);
