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
  AsyncStorage,
  TextInput
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

export default class DataEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credittoken: ""
    };
    this.handleonResponseGiven = this.handleonResponseGiven.bind(this);
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
  handleonResponseGiven(onResponseGiven, accept, token) {
    onResponseGiven(accept, token);
  }
  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#0e1130", true);
      StatusBar.setTranslucent(true);
    }
    const { onResponseGiven } = this.props;
    return (
      <Container style={styles.container}>
        <View style={styles.mainView}>
          <View style={styles.mainRow}>
            <Text style={styles.labelText}>Credit Token</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Token...."
              placeholderTextColor="#b7b7b7"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="default"
              textAlign={I18nManager.isRTL ? "right" : "left"}
              secureTextEntry={false}
              tintColor="#0691ce"
              onChangeText={text => this.setState({ credittoken: text })}
              value={this.state.credittoken}
            />
          </View>

          <View style={styles.dividerHorizontal} />

          <View style={styles.mainRow}>
            <TouchableOpacity
              style={styles.editInfoView}
              onPress={() =>
                this.handleonResponseGiven(onResponseGiven, false, "")
              }
            >
              <Text style={styles.editInfoText}>Ignore</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editInfoView}
              onPress={() =>
                this.handleonResponseGiven(
                  onResponseGiven,
                  true,
                  this.state.credittoken
                )
              }
            >
              <Text style={styles.editInfoText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}
