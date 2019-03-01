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
  I18nManager
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
import PlayingCard from "../../playingcard/card";
import KpashiPlayerDetail from "../../kpashiUIComponents/kpashiPlayerDetail/kpashiPlayerDetail";
export default class DroppedCards extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    var that = this;
  }
  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }
    var gameinfo = this.props.gameinfo;
    return (
      <ScrollView horizontal={true}>
        {gameinfo.playerDetails.map((item, index) => {
          return (
            <KpashiPlayerDetail
              key={index}
              playerdetail={item}
              gameinfo={gameinfo}
            />
          );
        })}
      </ScrollView>
    );
  }
}
