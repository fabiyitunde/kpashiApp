import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  ImageBackground,
  BackHandler,
  ScrollView,
  ListView,
  I18nManager,
  AsyncStorage
} from "react-native";
import {
  Content,
  Container,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Title,
  Segment,
  Label
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import styles from "./styles";
import { Fonts, Metrics, Colors, Images } from "../../Themes/";
import * as linq from "linq";
import { connect } from "react-redux";
import Login from "../login/login";
import { loggin_authenticated_user } from "../../redux/actions/appStateActions";
import { getItemFromLocalStorage } from "../../utilities/localstore";
class MyTables extends Component {
  constructor(props) {
    super(props);

    const rowHasChanged = (r1, r2) => r1 !== r2;
    this.ds = new ListView.DataSource({ rowHasChanged });

    // this.state = {
    //   dataSource: ds.cloneWithRows(this.formatData(props.mytablelist))
    // };
  }
  formatData(mytablelist) {
    return linq
      .from(mytablelist)
      .select(a => {
        return {
          id: a.id,
          title: a.description,
          itemImg: { uri: a.hostphotourl },
          notification: a.members.length
        };
      })
      .toArray();
  }
  componentWillMount() {
    var that = this;

    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("ECommerceMenu");
      return true;
    });
    var loginuser = async () => {
      const auth = await getItemFromLocalStorage("auth");
      if (auth) {
        const json = JSON.parse(auth);
        this.props.loggin_authenticated_user(json.id);
      }
    };

    (async () => {
      await loginuser();
    })();
  }

  _handleNotificationBack() {
    AsyncStorage.multiSet([["ArrivedForNotification", "ECommerceMyAccount"]]);
    this.props.navigation.navigate("ECommerceNotification");
  }

  opnetable = tableid => {
    this.props.navigation.navigate("TableView", { tableid: tableid });
  };
  _handleBagNavigation() {
    AsyncStorage.multiSet([["ArrivedFrom", "ECommerceMyAccount"]]);
    this.props.navigation.navigate("ECommerceMyBag");
  }

  _handleOpenPendingInvitationNavigation() {
    // AsyncStorage.multiSet([["ArrivedForWishList", "ECommerceMyAccount"]]);
    this.props.navigation.navigate("InvitationList");
  }

  _renderItem(rowData) {
    return (
      <TouchableOpacity
        style={styles.rowMain}
        onPress={() => this.opnetable(rowData.id)}
      >
        <View style={styles.imageContainer}>
          <Image source={rowData.itemImg} style={styles.itemImgStyle} />
          {rowData.notification ? (
            <View style={styles.notificationCircle}>
              <Text style={styles.notification}>{rowData.notification}</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.itemText}>{rowData.title}</Text>
      </TouchableOpacity>
    );
  }

  onBackClick() {
    this.props.navigation.navigate("ECommerceMenu");
  }

  render() {
    if (!this.props.loggedIn) return <Login />;
    StatusBar.setBarStyle("dark-content", true);

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#0e1130", true);
      StatusBar.setTranslucent(true);
    }

    var dataSource = this.ds.cloneWithRows(
      this.formatData(this.props.mytablelist)
    );
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
                size={Fonts.moderateScale(30)}
                color="white"
                style={{ paddingRight: 20 }}
              />
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>My Tables</Text>
          </Body>
          <Right style={styles.right}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => this._handleOpenPendingInvitationNavigation()}
              >
                <View style={styles.heartBg}>
                  <FontAwesome
                    name="heart"
                    size={Fonts.moderateScale(8)}
                    style={styles.heartIcon}
                  />
                </View>
                <View style={styles.alertBg}>
                  <Text style={styles.alertTxt}>
                    {this.props.invitationlist.length}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => this._handleBagNavigation()}
              >
                <SimpleLineIcons
                  name="handbag"
                  size={Fonts.moderateScale(18)}
                  style={styles.bagIcon}
                />
                <View style={styles.alertBg}>
                  <Text style={styles.alertTxt}>3</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Right>
        </Header>
        <ScrollView>
          <ListView
            contentContainerStyle={styles.content}
            dataSource={dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections
            scrollEnabled={false}
            pageSize={4}
          />
        </ScrollView>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    mytablelist: state.app.mytablelist,
    invitationlist: state.inv.invitations,
    loggedIn: state.app.loggedIn
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  { loggin_authenticated_user }
)(MyTables);
