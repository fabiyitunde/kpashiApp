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
export default class MyCards extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    var that = this;
  }
  handlePlayerDropedCard = (gameinfo, card) => {};
  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }
    const { gameinfo, onCardSelected } = this.props;
    return gameinfo.mycards == null ? null : (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.postImageContent}
      >
        {gameinfo.mycards.map((card, index) => {
          return (
            <TouchableOpacity
              key={index}
              onLongPress={() => onCardSelected(card)}
            >
              <View style={styles.imgs} key={index}>
                <PlayingCard
                  suittype={card.suittype}
                  cardtype={card.cardtype}
                  style={styles.postedImage}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}
