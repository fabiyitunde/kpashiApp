import React, { Component } from "react";
import * as rn from "react-navigation";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ListView,
  TextInput,
  BackHandler,
  I18nManager,
  Alert,
  ScrollView
} from "react-native";
import {
  Container,
  Button,
  Right,
  Left,
  ListItem,
  Content,
  Body,
  Header,
  Icon,
  Title
} from "native-base";
import Swiper from "react-native-swiper";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Foundation from "react-native-vector-icons/Foundation";

import { Images } from "../../Themes/";
import * as linq from "linq";
import { connect } from "react-redux";
import { sendmessage } from "../../redux/actions/chatActions";
import moment from "moment";
/**
 *  Profile Screen
 */
class Messaging extends Component {
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Home");
      return true;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this._scrollView = null;
  }

  handleSendMessage = () => {
    const { tableid, playerinfo, sendmessage } = this.props;

    try {
      if (this.state.text == "") throw "Empty Message Not Allowed";
      sendmessage(playerinfo, this.state.text, tableid);
      this.setState({ text: "" });
    } catch (error) {
      Alert.alert("Error", error);
    }
  };
  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }
    const { messagesrecieved, tableid, mytablelist } = this.props;

    var data = linq
      .from(messagesrecieved)
      .where(a => a.tableid == tableid)
      .orderBy(a => a.time)
      .select(a => {
        var obj = {};
        obj.id = a.id;
        obj.name = a.from;
        obj.profileImage = { uri: a.photourl };
        obj.time = moment(a.time).fromNow();
        obj.description = a.text;
        return obj;
      })
      .toArray();

    var tableinfo = mytablelist.find(a => a.id == tableid);
    var that = this;

    return (
      <Container style={styles.main}>
        <Header style={styles.header}>
          {/* Take up the space */}

          {/* Title */}
          <Body style={styles.body}>
            <Title style={styles.titleText}>{tableinfo.description}</Title>
          </Body>

          {/* Right Icon */}
          <Right style={styles.right}>
            <Button transparent />
          </Right>
        </Header>

        <ScrollView
          animation="zoomInDown"
          duration={1100}
          delay={1400}
          horizontal={false}
          ref={ref => {
            this._scrollView = ref;
          }}
          onContentSizeChange={(w, h) => {
            this._scrollView.scrollToEnd({ animated: true });
          }}
        >
          {data.map((item, index) => {
            return (
              <View style={styles.rowBg} key={index}>
                <View style={{ flexDirection: "row" }}>
                  <Image source={item.profileImage} style={styles.profileImg} />
                  <View style={styles.nameTimeMainView}>
                    <View style={styles.nameTimeView}>
                      <Text style={styles.rowNameTxt}>{item.name}</Text>
                      <View>
                        <Text style={styles.rowTimeTxt}>{item.time}</Text>
                      </View>
                    </View>
                    <Text style={styles.rowDescTxt}>{item.description}</Text>
                  </View>
                </View>
                <View
                  style={
                    index === data.length - 1 ? null : styles.dividerHorizontal
                  }
                />
              </View>
            );
          })}
        </ScrollView>

        {Platform.OS === "ios" ? (
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({
              ios: 100,
              android: 0
            })}
            behavior="padding"
          >
            <ScrollView>
              <View style={styles.bottomView}>
                <TextInput
                  style={styles.commentText}
                  placeholder="Enter your comments..."
                  placeholderTextColor="#c7c7cc"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  keyboardType="default"
                  textAlign={I18nManager.isRTL ? "right" : "left"}
                  selectionColor={"#6f6f6f"}
                  value={this.state.text}
                  onChangeText={text => this.setState({ text: text })}
                />
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={this.handleSendMessage}
                >
                  <FontAwesome
                    style={{ flex: 1 }}
                    name="share-square"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({
              ios: 0,
              android: 0
            })}
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
          >
            <View style={styles.bottomMainView}>
              <View style={styles.bottomView}>
                <TextInput
                  style={styles.commentText}
                  placeholder="Enter your comments..."
                  placeholderTextColor="#c7c7cc"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  keyboardType="default"
                  textAlign={I18nManager.isRTL ? "right" : "left"}
                  selectionColor={"#6f6f6f"}
                  onChangeText={text => this.setState({ text: text })}
                  value={this.state.text}
                />
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={this.handleSendMessage}
                >
                  <FontAwesome
                    style={{ flex: 1 }}
                    name="share-square"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    messagesrecieved: state.chat.messagesrecieved,
    playerinfo: state.player.playerinfo,
    mytablelist: state.app.mytablelist
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  { sendmessage }
)(Messaging);
