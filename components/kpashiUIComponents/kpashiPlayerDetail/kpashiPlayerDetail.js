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
import styles from "./styles";
import KpashiOpenedCards from "../kpashiOpenedCards";
import KpashiDeckOfCards from "../kpashiDeckOfCards";

class KpashiPlayerDetail extends Component {
  state = {};
  render() {
    const { gameinfo, playerdetail } = this.props;

    var dropedcard = [];
    if (playerdetail.dropedcard != null)
      dropedcard.push(playerdetail.dropedcard);
    var bordercolor = "black";
    const gamestatus = gameinfo.gamestatusdetail.description;
    if (gamestatus == "Finished" && playerdetail.readytoplay)
      bordercolor = "green";
    if (gamestatus == "Finished" && !playerdetail.readytoplay)
      bordercolor = "red";

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          borderColor: bordercolor,
          borderWidth: 3,
          marginLeft: 10,
          paddingLeft: 5
        }}
      >
        <View style={styles.slide}>
          <Image
            source={{ uri: playerdetail.photourl }}
            style={styles.imageStyle}
          />
          <View style={styles.titleBar}>
            <Text style={styles.name}>{playerdetail.fullname}</Text>
          </View>
          {playerdetail.gameStatus == "" ? null : (
            <Text style={styles.name}>{playerdetail.gameStatus}</Text>
          )}
          {playerdetail.cards == null ? null : (
            <View style={styles.bottombar}>
              <View style={styles.likeContent}>
                <Text style={styles.textStyle}>{playerdetail.score}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={{ flex: 2, paddingBottom: 10 }}>
          {playerdetail.dropedcard == null ? null : (
            <KpashiOpenedCards offset={35} cards={dropedcard} />
          )}
        </View>
        <View style={{ flex: 3 }}>
          {playerdetail.cards == null ? null : (
            <KpashiDeckOfCards cards={playerdetail.cards} />
          )}
        </View>
      </View>
    );
  }
}

export default KpashiPlayerDetail;
