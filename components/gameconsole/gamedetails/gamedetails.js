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

export default class GameDetails extends Component {
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
    const { gameinfo } = this.props;
    return (
      <View>
        <View style={styles.mainRow}>
          <Text style={styles.labelText}>Description</Text>
          <Text style={[styles.infoText, { color: "#0e1130" }]}>
            {gameinfo.tabledescription}
          </Text>
        </View>
        <View style={styles.dividerHorizontal} />

        <View style={styles.mainRow}>
          <Text style={styles.labelText}>Host Name</Text>
          <Text style={[styles.infoText, { color: "#0e1130" }]}>
            {gameinfo.hostname}
          </Text>
        </View>

        <View style={styles.dividerHorizontal} />

        <View style={styles.mainRow}>
          <Text style={styles.labelText}>Units/Round</Text>
          <Text style={[styles.infoText, { color: "#0e1130" }]}>
            {gameinfo.unitsperhand}
          </Text>
        </View>

        <View style={styles.dividerHorizontal} />

        <View style={styles.mainRow}>
          <Text style={styles.labelText}>Status</Text>
          <Text style={[styles.infoText, { color: "#0e1130" }]}>
            {gameinfo.gamestatusdetail.description}
          </Text>
        </View>

        <View style={styles.dividerHorizontal} />

        <View style={styles.mainRow}>
          <Text style={styles.labelText}>Next To Play</Text>
          <Text style={[styles.infoText, { color: "#0e1130" }]}>
            {gameinfo.nextplayerdetail.playername}
          </Text>
        </View>

        <View style={styles.dividerHorizontal} />
      </View>
    );
  }
}
