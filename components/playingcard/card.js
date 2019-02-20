import React from "react";
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
  BackHandler
} from "react-native";
import styles from "./cardstyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
class PlayingCard extends React.Component {
  state = {};
  resolveimageForcard(suittype) {
    var fontname = "";
    var fontcolour = "";
    if (suittype == 0) {
      fontname = "cards-spade";
      fontcolour = "black";
    }
    if (suittype == 1) {
      fontname = "cards-heart";
      fontcolour = "red";
    }
    if (suittype == 2) {
      fontname = "cards-diamond";
      fontcolour = "red";
    }
    if (suittype == 3) {
      fontname = "cards-club";
      fontcolour = "black";
    }
    return (
      <MaterialCommunityIcons name={fontname} color={fontcolour} size={30} />
    );
  }
  resolvecardimage(suittype) {
    if (suittype == 0) return require("../../assets/images/s.png");
    if (suittype == 1) return require("../../assets/images/h.png");
    if (suittype == 2) return require("../../assets/images/d.png");
    return require("../../assets/images/c.png");
  }
  resolveCardNumber(cardtype) {
    if (cardtype == 1) return "A";
    return cardtype;
  }
  render() {
    const { suittype, cardtype } = this.props;
    return (
      <View style={styles.dataStyle}>
        <Text style={styles.headertext}>
          {this.resolveCardNumber(cardtype)}
        </Text>
        {this.resolveimageForcard(suittype)}
        {/* <Image
          style={styles.dataImage}
          source={this.resolvecardimage(suittype)}
        /> */}
      </View>
    );
  }
}

export default PlayingCard;
