import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ListView,
  ScrollView,
  BackHandler,
  I18nManager,
  Animated,
  Easing
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Footer,
  FooterTab,
  Left,
  Body,
  Title,
  Content,
  Form,
  Label
} from "native-base";
import Swiper from "react-native-swiper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import MyCards from "./mycards/mycards";
import DroppedCards from "./droppedcards/droppedcards";
import OpenedCards from "./openedcards/openedcards";
import { Fonts } from "../../Themes/";
import { connect } from "react-redux";
import { getItemFromLocalStorageSync } from "../../utilities/localstore";
import {
  shuffleCards,
  dealcards,
  startNewGame,
  iAmReadyToPlay,
  dropCard
} from "../../redux/actions/gameStateActions";
import { openChatOverLayForTable } from "../../redux/actions/chatActions";

class GameConsole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xposition: new Animated.Value(0) // Initial value for opacity: 0
    };
    this.tableid = props.navigation.getParam("tableid", "");
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Profile");
      return true;
    });
  }
  componentDidUpdate() {
    var currentgame = this.props.gamelist.find(a => a.tableid == this.tableid);
    if (currentgame.gamestatusdetail.description == "DealingCards") {
      this.state.xposition.setValue(0);
      Animated.timing(
        this.state.xposition, // The animated value to drive
        {
          toValue: 2,
          duration: 2000,
          easing: Easing.bounce
        }
      ).start();
    }
  }
  handleActionButtonClicked = async gamedetails => {
    var authdata = JSON.parse(await getItemFromLocalStorageSync("auth"));
    if (gamedetails.gamestatusdetail.description == "Created") {
      this.props.shuffleCards(gamedetails.id, authdata.id);
    }
    if (gamedetails.gamestatusdetail.description == "ShufflingCards") {
      this.props.dealcards(gamedetails.id, authdata.id);
    }

    if (
      gamedetails.gamestatusdetail.description == "Finished" ||
      gamedetails.gamestatusdetail.description == "Cancelled"
    ) {
      if (gamedetails.readytoplay == "true") {
        this.props.startNewGame(authdata.id, gamedetails.tableid);
      } else {
        this.props.iAmReadyToPlay(authdata.id, gamedetails.tableid);
      }
    }
  };
  renderNextToplay(gamedetails) {
    if (gamedetails.gamestatusdetail.description != "Started") return null;
    var player = gamedetails.playerDetails.find(
      a => a.id == gamedetails.nextplayerdetail.playerid
    );
    return (
      <View style={styles.profileBodySec}>
        <Image source={{ uri: player.photourl }} style={styles.profileImage} />
        <View style={styles.profileDetail}>
          <Text style={styles.profileName}>{player.fullname}</Text>
          <Text style={styles.post}>{player.sittingposition}</Text>
        </View>
      </View>
    );
  }
  renderActionButton(gamedetails) {
    var buttondescription = "";
    if (gamedetails.gamestatusdetail.description == "Created") {
      buttondescription = "Shuffle Cards";
    }
    if (gamedetails.gamestatusdetail.description == "ShufflingCards") {
      buttondescription = "Deal Cards";
    }
    if (gamedetails.gamestatusdetail.description == "DealingCards") {
      buttondescription = "";
    }
    if (gamedetails.gamestatusdetail.description == "Started") {
      buttondescription = "";
    }
    if (
      gamedetails.gamestatusdetail.description == "Finished" ||
      gamedetails.gamestatusdetail.description == "Cancelled"
    ) {
      if (gamedetails.readytoplay == "true") {
        buttondescription = "New Game";
      } else {
        buttondescription = "Ready To Play";
      }
    }
    if (buttondescription == "") return null;
    return (
      <TouchableOpacity
        style={
          this.state.isFavorite ? styles.activeButton : styles.normalButton
        }
        onPress={() => this.handleActionButtonClicked(gamedetails)}
      >
        <Text
          style={
            this.state.isFavorite
              ? styles.activeButtonTxt
              : styles.normalButtonTxt
          }
        >
          {buttondescription}
        </Text>
      </TouchableOpacity>
    );
  }
  renderMyCards = gamedetails => {
    if (
      gamedetails.gamestatusdetail.description == "Finished" ||
      gamedetails.gamestatusdetail.description == "Cancelled"
    )
      return null;
    return (
      <MyCards
        onCardSelected={this.handleonCardSelected}
        gameinfo={gamedetails}
      />
    );
  };
  handleonCardSelected = async card => {
    var authdata = JSON.parse(await getItemFromLocalStorageSync("auth"));
    var gamedetails = this.props.gamelist.find(a => a.tableid == this.tableid);
    this.props.dropCard(
      gamedetails.id,
      authdata.id,
      card.suittype,
      card.cardtype
    );
  };

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }

    this.tableid = this.props.navigation.getParam("tableid", "");
    var currentgame = this.props.gamelist.find(a => a.tableid == this.tableid);
    var tableinfo = this.props.mytablelist.find(a => a.id == this.tableid);
    var userid = this.props.userid;
    const playerinfo = tableinfo.members.find(a => a.id == userid);

    const marginLeft = this.state.xposition.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 300, 0]
    });

    return (
      <Container style={{ backgroundColor: "#2d324f" }}>
        <Header androidStatusBarColor={"#0000"} style={styles.header}>
          {/* Take up the space */}
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() =>
                this.props.navigation.navigate("TableView", {
                  tableid: this.tableid
                })
              }
            >
              <Icon
                name={
                  I18nManager.isRTL ? "ios-arrow-forward" : "ios-arrow-back"
                }
                style={{ color: "#fff" }}
              />
            </TouchableOpacity>
          </Left>

          {/* Title */}
          <Body style={styles.body}>
            <Title style={styles.headerTitle}>
              {"Balance : " + playerinfo.unitbalance}
            </Title>
          </Body>

          {/* Right Icon */}
          <Right style={styles.right}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => this.props.openChatOverLayForTable(this.tableid)}
            >
              <View style={styles.heartBg}>
                <FontAwesome
                  name="comments"
                  size={Fonts.moderateScale(30)}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          </Right>
        </Header>

        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            {this.renderNextToplay(currentgame)}
            {this.renderActionButton(currentgame)}
          </View>
          <View style={styles.separatorStyle} />

          <Animated.View
            style={{
              ...styles.followContainer,
              marginLeft: marginLeft // Bind opacity to animated value
            }}
          >
            <OpenedCards gameinfo={currentgame} />
          </Animated.View>
        </View>

        <Content style={styles.slidesec}>
          <DroppedCards gameinfo={currentgame} />
          {this.renderMyCards(currentgame)}
        </Content>
      </Container>
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
  {
    shuffleCards,
    dealcards,
    startNewGame,
    iAmReadyToPlay,
    dropCard,
    openChatOverLayForTable
  }
)(GameConsole);
