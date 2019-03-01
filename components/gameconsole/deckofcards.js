import React, { Component } from "react";
import PlayingCard from "../playingcard/card";
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
import Svg from "react-native-svg";

import { Fonts, Metrics, Colors } from "../../Themes/";

class DeckOfCards extends Component {
  state = {};

  render() {
    const { cards } = this.props;
    const startingpoint = -90;
    const multiplier = 180 / cards.length;
    return (
      <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
        {cards.map((card, index) => {
          const factor = index * multiplier;
          const rotation = startingpoint + factor;
          const rotationdegree = rotation.toString() + "deg";
          const margintop = index * Metrics.HEIGHT * 0.11 * -1;
          const left = index * Metrics.WIDTH * 0.11;
          return (
            <View
              style={{
                marginLeft: left,
                marginTop: margintop
              }}
              key={index}
            >
              <PlayingCard suittype={card.suittype} cardtype={card.cardtype} />
            </View>
          );
        })}
      </View>
    );
  }
}

export default DeckOfCards;
