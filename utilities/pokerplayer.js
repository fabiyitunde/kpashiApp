import React from "react";
import * as _ from "underscore";
import { View, StyleSheet, Dimensions } from "react-native";
import PCard from "./pockercard";

var types = [
  {
    type: "♠︎",
    color: "black"
  },
  {
    type: "♦",
    color: "red"
  },
  {
    type: "♥︎",
    color: "red"
  },
  {
    type: "♣︎",
    color: "black"
  }
];

var orders = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

var screen = Dimensions.get("window");
export default class PockerPlayer extends React.Component {
  state = {};
  _recover() {
    var initTop = screen.height / 2 - 88;
    var initLeft = screen.width / 2 - 62;
    var count = 26;
    var matches = types.map(type => {
      return orders.map(order => {
        count -= 0.5;
        return {
          type: type.type,
          color: type.color,
          order: order
        };
      });
    });
    matches = _.shuffle(
      matches.reduce((p, c) => {
        return p.concat(c);
      })
    );
    this.Decks = matches.map(item => {
      count -= 0.5;
      return (
        <PCard
          customStyle={{ top: initTop + count, left: initLeft + count }}
          color={item.color}
          type={item.type}
          order={item.order}
        />
      );
    });
    return this.Decks;
  }
  render() {
    return <View style={styles.table}>{this._recover()}</View>;
  }
}
const styles = StyleSheet.create({
  table: {
    flex: 1,
    backgroundColor: "#49A077"
  }
});
