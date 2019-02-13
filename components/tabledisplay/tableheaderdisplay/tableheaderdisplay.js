import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  BackHandler,
  I18nManager,
  AsyncStorage
} from "react-native";
import {
  Content,
  Container,
  Right,
  Header,
  Left,
  Body,
  Title
} from "native-base";

import styles from "./styles";

export default class TableHeaderDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangePasswordClick() {
    this.props.navigation.navigate("ECommerceChangePassword");
  }

  onBackClick() {
    this.props.navigation.navigate("ECommerceMyAccount");
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("ECommerceMyAccount");
      return true;
    });
  }

  _handleBagNavigation() {
    AsyncStorage.multiSet([["ArrivedFrom", "ECommerceMyInformation"]]);
    this.props.navigation.navigate("ECommerceMyBag");
  }

  _handleWishListNavigation() {
    AsyncStorage.multiSet([["ArrivedForWishList", "ECommerceMyInformation"]]);
    this.props.navigation.navigate("ECommerceWishList");
  }

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#0e1130", true);
      StatusBar.setTranslucent(true);
    }
    const { tableinfo } = this.props;
    return (
      <View>
        <View style={styles.mainRow}>
          <Text style={styles.labelText}>Description</Text>
          <Text style={[styles.infoText, { color: "#0e1130" }]}>
            {tableinfo.description}
          </Text>
        </View>
        <View style={styles.dividerHorizontal} />

        <View style={styles.mainRow}>
          <Text style={styles.labelText}>Host Name</Text>
          <Text style={[styles.infoText, { color: "#0e1130" }]}>
            {tableinfo.hostname}
          </Text>
        </View>

        <View style={styles.dividerHorizontal} />

        <View style={styles.mainRow}>
          <Text style={styles.labelText}>Units/Round</Text>
          <Text style={[styles.infoText, { color: "#0e1130" }]}>
            {tableinfo.oneroundunit}
          </Text>
        </View>

        <View style={styles.dividerHorizontal} />

        <View style={styles.mainRow}>
          <Text style={styles.labelText}>Created On</Text>
          <Text style={[styles.infoText, { color: "#0e1130" }]}>
            {tableinfo.createOn}
          </Text>
        </View>

        <View style={styles.dividerHorizontal} />

        <View style={styles.mainRow}>
          <Text style={styles.labelText}>Player Count</Text>
          <Text style={[styles.infoText, { color: "#0e1130" }]}>
            {tableinfo.membercount}
          </Text>
        </View>

        <View style={styles.dividerHorizontal} />
      </View>
    );
  }
}
