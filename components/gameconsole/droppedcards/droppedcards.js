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
      <View style={styles.imgs}>
        {gameinfo.playerDetails.map((item, index) => {
          return (
            <View style={styles.listContainer} key={index}>
              <View style={styles.slide}>
                <Image
                  source={{ uri: item.photourl }}
                  style={styles.imageStyle}
                />
                <View style={styles.titleBar}>
                  <Text style={styles.name}>{item.fullname}</Text>
                </View>
                {item.gameStatus == "" ? null : (
                  <Text style={styles.name}>{item.gameStatus}</Text>
                )}
              </View>
              <View style={styles.notificationContent}>
                {item.dropedcard == null ? null : (
                  <PlayingCard
                    suittype={item.dropedcard.suittype}
                    cardtype={item.dropedcard.cardtype}
                    style={styles.postedImage}
                  />
                )}

                {item.cards == null ? null : (
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    style={styles.postImageContent}
                  >
                    {item.cards.map((card, index) => {
                      return (
                        <View key={index}>
                          <PlayingCard
                            suittype={card.suittype}
                            cardtype={card.cardtype}
                            style={styles.postedImage}
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                )}
                {item.cards == null ? null : (
                  <View style={styles.bottombar}>
                    <View style={styles.likeContent}>
                      <FontAwesome
                        name="heart"
                        size={15}
                        color="#d4d4d4"
                        style={styles.hearticon}
                      />
                      <Text style={styles.textStyle}>{item.score}</Text>
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.separatorStyle} />
            </View>
          );
        })}
      </View>
    );
  }
}
