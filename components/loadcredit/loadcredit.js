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
  Alert,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
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
import * as rn from "react-navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import styles from "./styles";
import { loadtoken } from "../../redux/actions/appStateActions";
import { connect } from "react-redux";

const isAndroid = Platform.OS === "android";

class LoadCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credittoken: ""
    };
    this.tableid = props.navigation.getParam("tableid", "");
  }

  onChangePasswordClick() {
    this.props.navigation.navigate("ECommerceChangePassword");
  }

  onBackClick() {
    this.props.navigation.navigate("TableView", { tableid: this.tableid });
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      this.onBackClick();
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
  getCurrentCreditBalance = (userid, tableinfo) => {
    var balance = 0;
    var player = tableinfo.members.find(a => a.id == userid);
    if (player) {
      balance = player.unitbalance;
    }
    return balance;
  };
  loadcreditToken = () => {
    const { loadtoken, userid } = this.props;
    const credittoken = this.state.credittoken;
    if (credittoken == "") {
      Alert.alert("Error", "Invalid Credit Token");
      return;
    }
    loadtoken(userid, this.tableid, credittoken, () => {
      this.setState({ credittoken: "" });
    });
  };
  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#0e1130", true);
      StatusBar.setTranslucent(true);
    }
    this.tableid = this.props.navigation.getParam("tableid", "");
    const { mytablelist, userid } = this.props;
    const tableinfo = mytablelist.find(a => a.id == this.tableid);
    const creditbalance = this.getCurrentCreditBalance(userid, tableinfo);
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={"#0e1130"} style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={this.onBackClick.bind(this)}
            >
              <FontAwesome
                name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                size={30}
                color="white"
                style={{ paddingRight: 20 }}
              />
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>Load Credits</Text>
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => this._handleWishListNavigation()}
            >
              <View style={styles.heartBg}>
                <FontAwesome name="heart" size={8} style={styles.heartIcon} />
              </View>
              <View style={styles.alertBg}>
                <Text style={styles.alertTxt}>1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => this._handleBagNavigation()}
            >
              <SimpleLineIcons
                name="handbag"
                size={20}
                style={styles.bagIcon}
              />
              <View style={styles.alertBg}>
                <Text style={styles.alertTxt}>3</Text>
              </View>
            </TouchableOpacity>
          </Right>
        </Header>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.select({
            ios: 0,
            android: rn.Header.HEIGHT * 2
          })}
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
        >
          <ScrollView>
            <View style={styles.mainRow}>
              <Text style={styles.labelText}>Table</Text>
              <Text style={[styles.infoText, { color: "#0e1130" }]}>
                {tableinfo.description}
              </Text>
            </View>

            <View style={styles.dividerHorizontal} />

            <View style={styles.mainRow}>
              <Text style={styles.labelText}>Host</Text>
              <Text style={[styles.infoText, { color: "#0e1130" }]}>
                {tableinfo.hostname}
              </Text>
            </View>

            <View style={styles.dividerHorizontal} />

            <View style={styles.mainRow}>
              <Text style={styles.labelText}>Current Balance</Text>
              <Text style={[styles.infoText, { color: "#0e1130" }]}>
                {creditbalance}
              </Text>
            </View>

            <View style={styles.dividerHorizontal} />

            <View style={styles.mainRow}>
              <Text style={styles.labelText}>Credit/Round</Text>
              <Text style={[styles.infoText, { color: "#0e1130" }]}>
                {tableinfo.oneroundunit}
              </Text>
            </View>

            <View style={styles.dividerHorizontal} />

            <View style={styles.mainRow}>
              <Text style={styles.labelText}>Credit Token</Text>
              <TextInput
                style={styles.editInfoText}
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

            <View style={{ flexDirection: "row" }}>
              <Left>
                <TouchableOpacity
                  style={styles.editInfoView}
                  onPress={() => this.loadcreditToken()}
                >
                  <Text style={styles.editInfoText}>Load</Text>
                </TouchableOpacity>
              </Left>
              <Right>
                <TouchableOpacity
                  style={styles.editInfoView}
                  onPress={() =>
                    this.props.navigation.navigate("TableView", {
                      tableid: this.tableid
                    })
                  }
                >
                  <Text style={styles.editInfoText}>Close</Text>
                </TouchableOpacity>
              </Right>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    mytablelist: state.app.mytablelist,
    userid: state.app.userid
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  { loadtoken }
)(LoadCredit);
