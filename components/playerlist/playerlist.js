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
  ScrollView
} from "react-native";
import {
  Container,
  Button,
  Right,
  Left,
  ListItem,
  Content,
  Header,
  Body,
  Title,
  Icon,
  Segment
} from "native-base";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import * as linq from "linq";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import { loadListOfPlayersOnline } from "../../redux/actions/appStateActions";
class PlayerList extends Component {
  state = {
    data: [],
    searchtext: ""
  };
  constructor(props) {
    super(props);
  }
  SearchFilterFunction = text => {
    this.setState({ searchtext: text });
    const { playerlist } = this.props;
    var data = [];
    if (text == "") {
      data = this.convertListToDisplayFormat(playerlist);
    } else {
      var filteredlist = linq
        .from(playerlist)
        .where(a => a.fullname.indexOf(text) !== -1)
        .toArray();
      data = this.convertListToDisplayFormat(filteredlist);
    }
    this.setState({ data: data });
  };
  convertListToDisplayFormat(listToConvert) {
    const data = linq
      .from(listToConvert)
      .select(player => {
        var obj = {};
        obj.id = player.id;
        obj.name = player.fullname;
        obj.post = player.email;
        obj.profileImg = { uri: player.photourl };
        obj.isSelected = true;
        return obj;
      })
      .toArray();
    return data;
  }
  componentWillMount() {}
  componentDidMount() {
    this.props.loadListOfPlayersOnline(() => {
      const { playerlist } = this.props;
      const data = this.convertListToDisplayFormat(playerlist);
      this.setState({ data: data });
    });
  }
  render() {
    const { onPlayerSelected, selectButtonDescription } = this.props;

    return (
      <Content>
        <SearchBar
          round //To make the searchbar corner round (default square)
          searchIcon={{ size: 24 }} //Size of the search icon
          onChangeText={text => this.SearchFilterFunction(text)}
          //Filter the list using the keywords inserted in searchbar
          onClear={text => this.SearchFilterFunction("")}
          placeholder="Type Here..."
          value={this.state.searchtext}
        />
        <ScrollView style={styles.peopleMainView}>
          <View style={styles.listContentPeople}>
            {this.state.data.map((item, index) => {
              return (
                <View style={styles.rowMainPeople} key={index}>
                  <View style={styles.imageShadow}>
                    <Image source={item.profileImg} style={styles.userImage} />
                  </View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.post}>{item.post}</Text>
                  <TouchableOpacity
                    style={styles.followBgSelected}
                    onPress={() => onPlayerSelected(item)}
                  >
                    <Text style={styles.followTxtSelected}>
                      {selectButtonDescription}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </Content>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    playerlist: state.app.playerlist
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  { loadListOfPlayersOnline }
)(PlayerList);
