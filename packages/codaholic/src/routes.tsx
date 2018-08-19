import { createStackNavigator } from "react-navigation";
import Redirector from "./containers/Redirector";
import Welcome from "./containers/Welcome";
import Dashboard from "./containers/Dashboard";

const MemberStack = createStackNavigator(
  {
    Dashboard
  },
  {
    initialRouteName: "Dashboard",
    headerMode: "none"
  }
);

const GuestStack = createStackNavigator(
  {
    Welcome
  },
  {
    initialRouteName: "Welcome",
    headerMode: "none"
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
    headerMode: "none"
  }
);

export default RootStack;
