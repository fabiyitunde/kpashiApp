import React, { Component } from "react";
import {
  Alert,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ListView,
  FlatList,
  BackHandler,
  I18nManager
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Footer,
  FooterTab,
  Left,
  Body,
  Title,
  Content,
  Form,
  Label,
  CheckBox
} from "native-base";
import PlayingCard from "../components/playingcard/card";
// Screen Styles
import styles from "./styles";

export default class WalkthroughEvents extends Component {
  constructor(props) {
    super(props);
    const dataObjects = [
      {
        id: 1,
        image:
          "https://antiqueruby.aliansoftware.net//Images/walkthrough/ic_music_wt_twentyfive.png",
        title: "Music"
      },
      {
        id: 2,
        image:
          "https://antiqueruby.aliansoftware.net//Images/walkthrough/ic_film_wt_twentyfive.png",
        title: "Film"
      },
      {
        id: 3,
        image:
          "https://antiqueruby.aliansoftware.net//Images/walkthrough/ic_food_wt_twentyfive.png",
        title: "Food"
      },
      {
        id: 4,
        image:
          "https://antiqueruby.aliansoftware.net//Images/walkthrough/ic_resort_wt_twentyfive.png",
        title: "Restaurant"
      },
      {
        id: 5,
        image:
          "https://antiqueruby.aliansoftware.net//Images/walkthrough/ic_music_wt_twentyfive.png",
        title: "Music"
      },
      {
        id: 6,
        image:
          "https://antiqueruby.aliansoftware.net//Images/walkthrough/ic_film_wt_twentyfive.png",
        title: "Film"
      },
      {
        id: 7,
        image:
          "https://antiqueruby.aliansoftware.net//Images/walkthrough/ic_food_wt_twentyfive.png",
        title: "Food"
      },
      {
        id: 8,
        image:
          "https://antiqueruby.aliansoftware.net//Images/walkthrough/ic_resort_wt_twentyfive.png",
        title: "Restaurant"
      },
      {
        id: 9,
        image:
          "https://antiqueruby.aliansoftware.net//Images/walkthrough/ic_music_wt_twentyfive.png",
        title: "Music"
      }
    ];
    const rowHasChanged = (r1, r2) => r1 !== r2;
    const ds = new ListView.DataSource({ rowHasChanged });

    this.state = {
      isLoading: true,
      dataSource: ds.cloneWithRows(dataObjects),
      selectedLots: [],
      flatlistdata: [...dataObjects]
    };
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Walkthrough");
      return true;
    });
  }

  onCheckBoxPress(id) {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    // console.warn('selected: ', this.state.selectedLots)
  }

  _renderRow(rowData) {
    return (
      <View>
        {rowData.id > 6 ? (
          <TouchableOpacity
            style={styles.dataStyle}
            onPress={() => this.onCheckBoxPress(rowData.id)}
          >
            <PlayingCard
              style={styles.listItem}
              suittype={2}
              cardtype={rowData.id}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
  _renderItem = ({ item }) => {
    return (
      <View>
        {item.id > 1 ? (
          <TouchableOpacity
            style={styles.dataStyle}
            onPress={() => this.onCheckBoxPress(item.id)}
          >
            <View>
              <Text>{item.title}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.dataImage} />
            <View style={styles.chBoxBg}>
              <CheckBox
                checked={
                  this.state.selectedLots.includes(item.id) ? true : false
                }
                onPress={() => this.onCheckBoxPress(item.id)}
                color={
                  this.state.selectedLots.includes(item.id)
                    ? "#4cd964"
                    : "transparent"
                }
                style={styles.chBox}
              />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  _keyExtractor = (item, index) => item.id;
  render() {
    // StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("rgba(0,0,0,0.3)", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.container}>
        <View style={styles.slidesec}>
          <Text style={styles.headertext}>
            What kind of events are you interested in please?
          </Text>
          <Text style={styles.desctext}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor.
          </Text>

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "stretch"
            }}
          >
            <PlayingCard style={styles.listItem} suittype={2} cardtype={10} />
            <ListView
              horizontal={true}
              style={styles.listItem}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
              enableEmptySections
              indicatorStyle={"white"}
            />
          </View>
        </View>
      </Container>
    );
  }
}
