import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ListView,
  BackHandler,
  I18nManager
} from "react-native";
import {
  Container,
  Button,
  Content,
  Header,
  Body,
  Title,
  Right,
  Left,
  Icon
} from "native-base";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Images } from "../../Themes/";
import * as linq from "linq";
import { connect } from "react-redux";
import ScrollableTabView, {
  ScrollableTabBar
} from "../Components/react-native-scrollable-tab-view";

class InvitationList extends Component {
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Home");
      return true;
    });
  }
  transformdata = invitationtableList => {
    return linq
      .from(invitationtableList)
      .select(a => {
        var obj = {};
        obj.id = a.id;
        obj.image = { uri: a.hostphotourl };
        obj.name = a.hostname;
        obj.comment = a.description;
        obj.likes = a.membercount;
        obj.comments = a.oneroundunit;
        return obj;
      })
      .toArray();
  };
  constructor(props) {
    super(props);

    const rowHasChanged = (r1, r2) => r1 !== r2;
    this.ds = new ListView.DataSource({ rowHasChanged });

    this.state = {
      isLoading: true
    };
  }

  _renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowMain}>
          <Image source={rowData.image} style={styles.images} />
          <View style={styles.newsContent}>
            <Text numberOfLines={1} style={styles.name}>
              {rowData.name}
            </Text>
            <Text numberOfLines={3} style={styles.comment}>
              {rowData.comment}
            </Text>
            <View style={styles.followContent}>
              <View style={styles.likeContent}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("InvitationResponse", {
                      tableid: rowData.id
                    })
                  }
                >
                  <FontAwesome name="check-circle-o" size={35} color="green" />
                </TouchableOpacity>
                <Text style={styles.textStyle}>{rowData.likes}</Text>
              </View>
              <View style={styles.likeContent}>
                <TouchableOpacity onPress={() => alert("Comment")}>
                  <Image
                    style={styles.likeCommentShareImage}
                    source={Images.comments}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>{rowData.comments}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.separatorStyle} />
      </View>
    );
  }
  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }
    const { invitationlist } = this.props;
    const dataObjects = this.transformdata(invitationlist);
    const dataSource = this.ds.cloneWithRows(dataObjects);
    var that = this;
    var underlineStyle = I18nManager.isRTL
      ? styles.tabUnderLineTrans
      : styles.tabUnderLine;
    return (
      <Container style={styles.main}>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => that.props.navigation.navigate("Home")}
            >
              {I18nManager.isRTL ? (
                <MaterialIcons name="chevron-right" size={25} color="white" />
              ) : (
                <MaterialIcons name="chevron-left" size={25} color="white" />
              )}
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.headerTitle}>Invitations</Text>
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity onPress={() => alert("Search")}>
              <Ionicons name="ios-search" size={25} color="white" />
            </TouchableOpacity>
          </Right>
        </Header>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator}
          enableEmptySections
          pageSize={4}
        />
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    invitationlist: state.inv.invitations
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  {}
)(InvitationList);
