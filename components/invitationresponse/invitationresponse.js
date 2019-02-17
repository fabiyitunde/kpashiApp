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
  FlatList,
  BackHandler,
  I18nManager,
  View,
  ScrollView,
  Alert
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
  Footer
} from "native-base";
import Swiper from "react-native-swiper";
// Screen Styles
import styles from "./styles";
import { getItemFromLocalStorageSync } from "../../utilities/localstore";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import TableDisplay from "../tabledisplay/tabledisplay";
import DataEntry from "./dataentry/dataentry";
import {
  acceptInvitation,
  rejectInvitation
} from "../../redux/actions/invitationStateActions";
/**
 *  Social Screen
 */
class InvitationResponse extends Component {
  constructor(props) {
    super(props);

    this.tableid = props.navigation.getParam("tableid", "");
  }
  handleonResponseGiven = async (invitationaccepted, credittoken) => {
    const { invitations } = this.props;
    var tableinfo = { ...invitations.find(a => a.id == this.tableid) };
    var authdata = JSON.parse(await getItemFromLocalStorageSync("auth"));
    if (invitationaccepted == true && credittoken == "") {
      Alert.alert("Invalid Data", "Credit Token Is Compulsary");
      return;
    }
    if (invitationaccepted) {
      this.props.acceptInvitation(authdata.id, credittoken, this.tableid);
    } else {
      this.props.rejectInvitation(tableinfo);
    }
    this.props.navigation.navigate("InvitationList");
  };
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Social");
      return true;
    });
  }

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }
    this.tableid = this.props.navigation.getParam("tableid", "");
    const { invitations } = this.props;
    var tableinfo = invitations.find(a => a.id == this.tableid);
    var that = this;
    if (tableinfo == null) return null;
    return (
      <Container style={styles.main}>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => that.props.navigation.navigate("Social")}
            >
              {I18nManager.isRTL ? (
                <MaterialIcons name="chevron-right" size={25} color="white" />
              ) : (
                <MaterialIcons name="chevron-left" size={25} color="white" />
              )}
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>Table Invitation</Text>
          </Body>
          <Right style={styles.right} />
        </Header>

        <Content style={{ flex: 1, flexDirection: "row" }}>
          <ScrollView style={{ flex: 5 }}>
            <TableDisplay style={styles.mainRow} tableinfo={tableinfo} />
          </ScrollView>
          <View style={{ flex: 1 }}>
            <DataEntry
              style={styles.rowMainView}
              onResponseGiven={this.handleonResponseGiven}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    invitations: state.inv.invitations
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  { acceptInvitation, rejectInvitation }
)(InvitationResponse);
