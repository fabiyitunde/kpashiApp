import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  DrawerNavigator,
  StackNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import WalkthroughEvents from "../matdesign/index";
import MyTables from "../components/mytables/mytables";
import TableView from "../components/tableview/tableview";
import InvitationList from "../components/invitationlist/invitationlist";
import InvitationResponse from "../components/invitationresponse/invitationresponse";
import DataEntry from "../components/invitationresponse/dataentry/dataentry";
import GameConsole from "../components/gameconsole/gameconsole";
import LoadCredit from "../components/loadcredit/loadcredit";
import MenuDrawer from "../components/menudrawer/menudrawer";
const kpashiDrawerStack = createDrawerNavigator(
  {
    Home: { screen: MyTables },
    TableView: { screen: TableView },
    InvitationList: { screen: InvitationList },
    InvitationResponse: { screen: InvitationResponse },
    DataEntry: { screen: DataEntry },
    GameConsole: { screen: GameConsole },
    LoadCredit: { screen: LoadCredit }
  },
  {
    gesturesEnabled: false,
    contentComponent: MenuDrawer
  }
);
const DrawerNavigationkpashi = createStackNavigator(
  {
    kpashiDrawerStack: { screen: kpashiDrawerStack }
  },
  {
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: false
    })
  }
);
const PrimaryNav = createStackNavigator(
  {
    DrawerNavigationkpashi: { screen: DrawerNavigationkpashi }
  },
  {
    headerMode: "none",
    gesturesEnabled: false
  }
);

export default PrimaryNav;
