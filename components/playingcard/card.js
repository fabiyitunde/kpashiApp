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
class PlayingCard extends React.Component {
  state = {};
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
        <Image
          style={styles.dataImage}
          source={this.resolvecardimage(suittype)}
        />
      </View>
    );
  }
}

export default PlayingCard;
