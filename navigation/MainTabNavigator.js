import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
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
const HomeStack = createStackNavigator({
  Home: MyTables,
  TableView: TableView,
  InvitationList: InvitationList,
  InvitationResponse: InvitationResponse,
  DataEntry: DataEntry
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
});
