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
import { registerForPushNotifications } from "../../utilities/pushNotifications";
import Drawer from "react-native-drawer";
import MenuDrawer from "../menudrawer/menudrawer";
import tweens from "./tweens";
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0
  }
};
class MyTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerType: "static",
      openDrawerOffset: 50,
      closedDrawerOffset: 0,
      panOpenMask: 0.1,
      relativeDrag: false,
      panThreshold: 0.25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: "linear",
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: true,
      negotiatePan: false,
      side: "left"
    };
    const rowHasChanged = (r1, r2) => r1 !== r2;
    this.ds = new ListView.DataSource({ rowHasChanged });

    // this.state = {
    //   dataSource: ds.cloneWithRows(this.formatData(props.mytablelist))
    // };
  }
  setDrawerType(type) {
    this.setState({
      drawerType: type
    });
  }

  tweenHandler(ratio) {
    if (!this.state.tweenHandlerPreset) {
      return {};
    }
    return tweens[this.state.tweenHandlerPreset](ratio);
  }

  noopChange() {
    this.setState({
      changeVal: Math.random()
    });
  }

  openDrawer() {
    this.drawer.open();
  }

  setStateFrag(frag) {
    this.setState(frag);
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
  componentDidMount() {}
  componentWillMount() {
    var that = this;

    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("MyTables");
      return true;
    });
    var loginuser = async () => {
      const auth = await getItemFromLocalStorage("auth");
      if (auth) {
        const json = JSON.parse(auth);
        this.props.loggin_authenticated_user(json.id);
        await registerForPushNotifications();
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
    //that.props.navigation.navigate("MyTables");
  }
  handleOpenDrawer = () => {
    //that.props.navigation.navigate("MyTables");

    this.props.navigation.navigate("DrawerOpen");
  };
  render() {
    var that = this;

    if (!this.props.loggedIn) return <Login />;
    StatusBar.setBarStyle("light-content", true);

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }
    var controlPanel = (
      <MenuDrawer
        closeDrawer={() => {
          this.drawer.close();
        }}
        navigation={this.props.navigation}
      />
    );
    var dataSource = this.ds.cloneWithRows(
      this.formatData(this.props.mytablelist)
    );
    return (
      <View style={styles.container}>
        <Drawer
          ref={c => (this.drawer = c)}
          type={this.state.drawerType}
          animation={this.state.animation}
          openDrawerOffset={this.state.openDrawerOffset}
          closedDrawerOffset={this.state.closedDrawerOffset}
          panOpenMask={this.state.panOpenMask}
          panCloseMask={this.state.panCloseMask}
          relativeDrag={this.state.relativeDrag}
          panThreshold={this.state.panThreshold}
          content={controlPanel}
          styles={drawerStyles}
          disabled={this.state.disabled}
          tweenHandler={this.tweenHandler.bind(this)}
          tweenDuration={this.state.tweenDuration}
          tweenEasing={this.state.tweenEasing}
          acceptDoubleTap={this.state.acceptDoubleTap}
          acceptTap={this.state.acceptTap}
          acceptPan={this.state.acceptPan}
          tapToClose={this.state.tapToClose}
          negotiatePan={this.state.negotiatePan}
          changeVal={this.state.changeVal}
          side={this.state.side}
        >
          <View style={styles.drawercontainer}>
            <Header style={styles.header}>
              <Left>
                <TouchableOpacity onPress={() => this.openDrawer()}>
                  <FontAwesome
                    name="bars"
                    size={Fonts.moderateScale(18)}
                    style={styles.heartIcon}
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
                    onPress={() =>
                      this._handleOpenPendingInvitationNavigation()
                    }
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

            <Content>
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
            </Content>
          </View>
        </Drawer>
      </View>
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
