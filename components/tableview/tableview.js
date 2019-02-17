import React, { Component } from "react";
import {
  ScrollView,
  Platform,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  ListView,
  BackHandler,
  I18nManager,
  Modal,
  Alert
} from "react-native";
import {
  Container,
  Button,
  Right,
  Left,
  Content,
  Body,
  Header,
  Icon,
  Title
} from "native-base";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Images from "../../Themes/Images";
import styles from "./styles";
import TabList from "./TabList.js";
import { connect } from "react-redux";
import PlayerList from "../playerlist/playerlist";
import { globalParams } from "../../params";
import { getItemFromLocalStorageSync } from "../../utilities/localstore";
import {
  loadGame,
  cancelCurrentGame
} from "../../redux/actions/gameStateActions";
import { removePlayerFromTable } from "../../redux/actions/appStateActions";
const bgImage =
  "https://antiqueruby.aliansoftware.net//Images/profile/background_p30.png";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};
const NewsRoute = () => (
  <View style={[styles.container, { backgroundColor: "transparent" }]}>
    <TabList />
  </View>
);
const VideoRoute = () => (
  <View style={[styles.container, { backgroundColor: "transparent" }]}>
    <TabList />
  </View>
);
const EventRoute = () => (
  <View style={[styles.container, { backgroundColor: "transparent" }]}>
    <TabList />
  </View>
);
const BooksRoute = () => (
  <View style={[styles.container, { backgroundColor: "transparent" }]}>
    <TabList />
  </View>
);

class TableView extends Component {
  state = {
    modalVisible: false
  };
  constructor(props) {
    super(props);

    this.tableid = props.navigation.getParam("tableid", "");
  }
  handleonPlayerSelected = async selectedplayer => {
    var authdata = JSON.parse(await getItemFromLocalStorageSync("auth"));
    const data = {
      hostuserid: authdata.id,
      guestuserid: selectedplayer.id,
      tableid: this.tableid
    };
    fetch(`${globalParams.baseurl}/registration/sendTableInvite`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(resp => {
        if (!resp.ok) throw resp;
        return resp.json();
      })
      .then(data => {
        Alert.alert("Invitation", "Sent Successfully.. wait for response");
      })
      .catch(error => {
        console.log(error);
        error.text().then(errorMessage => {
          Alert.alert("Error", errorMessage);
        });
      });
    this.setState({ modalVisible: false });
  };
  _renderTitle = ({ route }) => {
    return (
      <View>
        <Text
          style={
            route.id == this.state.index
              ? styles.activeLabel
              : styles.normalLabel
          }
        >
          {route.title}
        </Text>
      </View>
    );
  };
  handleCancelCurrentGame = () => {
    const { userid, cancelCurrentGame } = this.props;
    Alert.alert(
      "Game Cancellation",
      "Are You Sure Of This Move",
      [
        {
          text: "Yes I Am",
          onPress: () => cancelCurrentGame(userid, this.tableid)
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  renderCancellGameButton = () => {
    const { gamelist } = this.props;
    const currentgame = gamelist.find(a => a.tableid == this.tableid);
    if (currentgame == null) return null;
    if (currentgame.gamestatusdetail.description != "Started") return null;
    return (
      <TouchableOpacity
        onPress={() => this.handleCancelCurrentGame()}
        style={styles.commentBg}
      >
        <FontAwesome name="bell-slash" size={20} color="white" />
      </TouchableOpacity>
    );
  };
  _handleIndexChange = index => this.setState({ index });
  handleLoadGame = async () => {
    var authdata = JSON.parse(await getItemFromLocalStorageSync("auth"));

    this.props.loadGame(this.tableid, authdata.id, () => {
      this.props.navigation.navigate("GameConsole", {
        tableid: this.tableid
      });
    });
  };
  _renderHeader = props => (
    <TabBar
      {...props}
      renderLabel={this._renderTitle}
      indicatorStyle={{ backgroundColor: "transparent" }}
      style={{ backgroundColor: "#e6e6e6", elevation: 0 }}
    />
  );

  _renderScene = SceneMap({
    news: NewsRoute,
    videos: VideoRoute,
    events: EventRoute,
    books: BooksRoute
  });

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Home");
      return true;
    });
  }
  handleonRemovePlayer = playerid => {
    const { userid, removePlayerFromTable } = this.props;
    Alert.alert(
      "Player Removal",
      "Are You Sure You Want To CheckOut This Player",
      [
        {
          text: "Yes I Am",
          onPress: () => removePlayerFromTable(playerid, userid, this.tableid)
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  render() {
    StatusBar.setBarStyle("light-content");
    if (Platform.OS === "android") {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.2)", true);
    }
    const { mytablelist } = this.props;
    this.tableid = this.props.navigation.getParam("tableid", "");
    var tableinfo = mytablelist.find(a => a.id == this.tableid);
    if (tableinfo == null) return null;
    var members = tableinfo.members;
    return (
      <View style={styles.main}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <PlayerList
            onPlayerSelected={this.handleonPlayerSelected}
            selectButtonDescription={"Invite"}
          />
          <TouchableHighlight
            onPress={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <Text style={styles.headerTxt2}>Close</Text>
          </TouchableHighlight>
        </Modal>
        <ImageBackground style={styles.imgContainer} source={{ uri: bgImage }}>
          <View style={styles.topContent}>
            <Header androidStatusBarColor={"transparent"} style={styles.header}>
              <Left style={styles.left}>
                <TouchableOpacity
                  style={styles.backArrow}
                  onPress={() => this.props.navigation.navigate("Home")}
                >
                  <Icon
                    name={
                      I18nManager.isRTL ? "ios-arrow-forward" : "ios-arrow-back"
                    }
                    style={styles.backArrow2}
                  />
                </TouchableOpacity>
              </Left>

              <Body style={styles.body}>
                <Title style={styles.headerTxt}>{tableinfo.description}</Title>
                <Text style={styles.labelTxt}> {tableinfo.hostname}</Text>
              </Body>

              <Right style={styles.right}>
                <Button transparent />
              </Right>
            </Header>

            <View style={styles.shadowTwoProfileImg}>
              <View style={styles.shadowOneProfileImg}>
                <Image
                  source={{ uri: tableinfo.hostphotourl }}
                  style={styles.profileImg}
                />
              </View>
            </View>

            <View style={styles.btnSec}>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: true })}
                style={styles.addUserBg}
              >
                <Image
                  source={Images.addUserIcon}
                  style={styles.userCommentImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("LoadCredit", {
                    tableid: this.tableid
                  })
                }
                style={styles.commentBg}
              >
                <FontAwesome name="comment" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleLoadGame()}
                style={styles.callBg}
              >
                <Ionicons name="ios-call" size={27} color="white" />
              </TouchableOpacity>
              {this.renderCancellGameButton()}
            </View>

            <View style={styles.followerFollowingDetailsBg}>
              <View style={styles.countLabelBg}>
                <View style={styles.followerFollowingBg}>
                  <Text style={styles.countTxt}>{tableinfo.oneroundunit}</Text>
                  <Text style={styles.labelTxt}>Unit/Round</Text>
                </View>
                <View style={styles.divider} />
              </View>
              <View style={styles.countLabelBg}>
                <View style={styles.followerFollowingBg}>
                  <Text style={styles.countTxt}>{tableinfo.isOn}</Text>
                  <Text style={styles.labelTxt}>Game On</Text>
                </View>
                <View style={styles.divider} />
              </View>
              <View style={styles.likeBg}>
                <Text style={styles.countTxt}>{tableinfo.membercount}</Text>
                <Text style={styles.labelTxt}>Member Count</Text>
              </View>
            </View>
            <View style={styles.imageBottomBg} />
          </View>
        </ImageBackground>

        <View style={styles.bottomContent}>
          <TabList
            members={members}
            onRemovePlayer={this.handleonRemovePlayer}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    mytablelist: state.app.mytablelist,
    gamelist: state.game.gamelist,
    userid: state.app.userid
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  { loadGame, cancelCurrentGame, removePlayerFromTable }
)(TableView);
