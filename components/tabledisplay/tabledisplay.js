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
  Modal
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
import TableDetailDisplay from "./tabledetaildisplay/tabledetaildisplay";
import TableHeaderDisplay from "./tableheaderdisplay/tableheaderdisplay";
class TableDisplay extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const { tableinfo } = this.props;
    console.log("selected table", tableinfo);
    return (
      <View>
        <TableHeaderDisplay tableinfo={tableinfo} />
        <TableDetailDisplay members={tableinfo.members} />
      </View>
    );
  }
}

export default TableDisplay;
