import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import { Container, Header, Content, Item, Input, Icon } from "native-base";
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
class MenuDrawer extends Component {
  constructor(props) {
    super(props);
  }
  renderCreditBalance(playerinfo) {
    if (playerinfo.availablecredit)
      return `Balance: ${playerinfo.availablecredit}`;
    return `Balance: 0`;
  }
  handleNavigationHome = () => {
    const { navigation, closeDrawer } = this.props;
    navigation.navigate("Home");
    closeDrawer();
  };
  handleNavigationInvitations = () => {
    const { navigation, closeDrawer } = this.props;
    navigation.navigate("InvitationList");
    closeDrawer();
  };
  render() {
    const { playerinfo } = this.props;
    const profileImgUri = playerinfo.photourl;
    return (
      <Container style={styles.menuContainer}>
        <View style={styles.userProfiles}>
          <View style={styles.userProfilestyleSec}>
            <Image
              source={{ uri: profileImgUri }}
              style={styles.userImageStyle}
            />
          </View>
          <View style={styles.userDetailsStyle}>
            <Text style={styles.userDetailsText}>{playerinfo.fullname}</Text>
            <Text style={styles.userDetailsText}>
              {this.renderCreditBalance(playerinfo)}
            </Text>
          </View>
        </View>
        <Content style={styles.menucontrolPanel}>
          <View style={styles.menumainview}>
            <TouchableOpacity onPress={this.handleNavigationHome}>
              <View style={styles.listrow}>
                <Ionicons name="md-home" color="#ffffff" size={20} />
                <Text style={styles.rowtxt}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleNavigationInvitations}>
              <View style={styles.listrow}>
                <MaterialCommunityIcons name="file" color="#ffffff" size={20} />
                <Text style={styles.rowtxt}>Invitations</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert("Message")}>
              <View style={styles.listrow}>
                <SimpleLineIcons name="bubbles" color="#ffffff" size={20} />
                <Text style={styles.rowtxt}>Message</Text>
                <View style={styles.notiCountSec}>
                  <Text style={styles.notiCount}>128</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert("Activity")}>
              <View style={styles.listrow}>
                <SimpleLineIcons name="bell" color="#ffffff" size={20} />
                <Text style={styles.rowtxt}>Activity</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert("Favourite")}>
              <View style={styles.listrow}>
                <FontAwesome name="star" color="#ffffff" size={20} />
                <Text style={styles.rowtxt}>Favourite</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert("Friends")}>
              <View style={styles.listrow}>
                <SimpleLineIcons name="people" color="#ffffff" size={20} />
                <Text style={styles.rowtxt}>Friends</Text>
                <View style={styles.notiCountSec}>
                  <Text style={styles.notiCount}>15</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert("Logout")}>
              <View style={styles.listrow}>
                <SimpleLineIcons name="logout" color="#ffffff" size={20} />
                <Text style={styles.rowtxt}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    playerinfo: state.player.playerinfo
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  {}
)(MenuDrawer);
