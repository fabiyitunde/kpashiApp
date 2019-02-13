import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ListView
} from "react-native";
import {
  Container,
  Button,
  Right,
  Left,
  ListItem,
  Content,
  Body
} from "native-base";
import Swiper from "react-native-swiper";
import Entypo from "react-native-vector-icons/Entypo";
// import NestedScrollView from 'react-native-nested-scrollview';
// Screen Styles
import styles from "./styles";
import Images from "../../../Themes/Images";
const { width, height } = Dimensions.get("window");
import { View } from "react-native-animatable";
import * as linq from "linq";
/**
 *  Profile Screen
 */
const cardBgImageOne =
  "https://antiqueruby.aliansoftware.net//Images/profile/iv_item_p30.png";
const cardBgImageTwo =
  "https://antiqueruby.aliansoftware.net//Images/profile/iv_item_2_p30.png";

export default class TableDetailDisplay extends Component {
  constructor(props) {
    super(props);

    const data = linq
      .from(props.members)
      .select(a => {
        var obj = {};
        obj.id = a.id;
        obj.cardBgImage = { uri: a.photourl };
        obj.title = a.fullname;
        obj.description = a.lastactivitytime;
        obj.likeCount = a.unitbalance;
        obj.commentCount = a.position;
        return obj;
      })
      .toArray();
    const rowHasChanged = (r1, r2) => r1 !== r2;
    const ds = new ListView.DataSource({ rowHasChanged });

    this.state = {
      isLoading: true,
      dataSource: ds.cloneWithRows(data)
    };
  }

  _renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowMain}>
          <Image source={rowData.cardBgImage} style={styles.cardBgImage} />
          <View style={styles.cardDetailBg}>
            <Text numberOfLines={1} style={styles.titleTxt}>
              {rowData.title}
            </Text>
            <Text numberOfLines={3} style={styles.descriptionTxt}>
              {rowData.description}
            </Text>
            <View style={styles.likeCommentBg}>
              <TouchableOpacity
                onPress={() => alert("Like")}
                style={styles.countImgBg}
              >
                <Entypo name="heart" size={15} color="#d4d4d4" />
                <Text style={styles.likeCommentCountTxt}>
                  {rowData.likeCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.countImgBg}
                onPress={() => alert("Comment")}
              >
                <Image style={styles.commentImg} source={Images.comments} />
                <Text style={styles.likeCommentCountTxt}>
                  {rowData.commentCount}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.listDivider} />
      </View>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        scrollEnabled={true}
      />
    );
  }
}
