import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "../../navigation/AppNavigator";
import Login from "../login/login";
import { getItemFromLocalStorage } from "../../utilities/localstore";

import { connect } from "react-redux";
import {
  loggin_authenticated_user,
  initSocketIO
} from "../../redux/actions/appStateActions";
class Home extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount() {
    var loginuser = async () => {
      const auth = await getItemFromLocalStorage("auth");
      if (auth) {
        const json = JSON.parse(auth);
        this.props.loggin_authenticated_user(json.id);
      }
    };

    (async () => {
      await loginuser();
    })();
  }
  render() {
    if (!this.props.loggedIn) {
      return <Login />;
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
function mapStateToProps(state, props) {
  return {
    loggedIn: state.app.loggedIn
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  { loggin_authenticated_user, initSocketIO }
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
