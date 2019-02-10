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
import { connect } from "react-redux";
class Home extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount() {
    // logIn();
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
  {}
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
