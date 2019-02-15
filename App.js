import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
  YellowBox
} from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import Home from "./components/home/home";
import { Provider } from "react-redux";
import store from "./redux/store"; //Import the store
export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount() {
    // logIn();
    YellowBox.ignoreWarnings([
      "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
    ]);
  }
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png"),
        require("./assets/sound/dropcard.wav")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app HelveticaNeue-Light
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        "SFUIDisplay-Regular": require("./assets/fonts/SFUIDisplay-Regular.ttf"),
        "SFUIDisplay-Semibold": require("./assets/fonts/SF-UI-Display-Semibold.ttf"),
        "HelveticaNeue-Light": require("./assets/fonts/HelveticaNeue-Light.ttf"),
        "SFUIDisplay-Medium": require("./assets/fonts/SF-UI-Display-Medium.ttf"),
        Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
        "SFUIDisplay-Bold": require("./assets/fonts/SFUIDisplay-Bold.ttf"),
        "Avenir-Black": require("./assets/fonts/Avenir-Black.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
