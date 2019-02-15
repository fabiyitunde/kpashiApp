import React, { PropTypes, Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
  BackHandler,
  I18nManager,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Title,
  Form,
  Label
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { loginuser } from "../../redux/actions/appStateActions";
// Screen Styles
import styles from "./styles";
import * as rn from "react-navigation";
class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin() {
    this.props.loginuser(this.state.email, this.state.password);
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Home");
      return true;
    });
  }

  render() {
    let pic = {
      uri:
        "https://antiqueruby.aliansoftware.net/Images/signin/background_snine.png"
    };

    StatusBar.setBarStyle("dark-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container>
        <ImageBackground source={pic} style={styles.backgroundImage}>
          <Header style={styles.header}>
            <Left style={styles.left}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <FontAwesome
                  name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Text style={styles.textTitle} />
            </Body>
            <Right style={styles.right} />
          </Header>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.select({
              ios: 0,
              android: rn.Header.HEIGHT * 2
            })}
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
          >
            <ScrollView style={styles.inputFieldSec}>
              <View style={styles.mainLogoSec}>
                <Image
                  source={require("../../assets/images/logo.png")}
                  style={styles.mainLogo}
                />
              </View>

              <View style={styles.inputFieldSec}>
                <Form style={styles.formStyle}>
                  <Item
                    floatingLabel
                    textAlign={I18nManager.isRTL ? "right" : "left"}
                    style={styles.emailText}
                  >
                    <Label
                      textAlign={I18nManager.isRTL ? "right" : "left"}
                      style={{ color: "red", right: 0 }}
                    >
                      Email
                    </Label>
                    <Input
                      keyboardType="email-address"
                      textAlign={I18nManager.isRTL ? "right" : "left"}
                      style={styles.inputText}
                      onChangeText={text => {
                        this.setState({ email: text });
                      }}
                      value={this.state.email}
                    />
                  </Item>
                  <Item floatingLabel style={styles.passwordText}>
                    <Label
                      textAlign={I18nManager.isRTL ? "right" : "left"}
                      style={{
                        fontFamily: "SFUIDisplay-Regular",
                        paddingTop: 1
                      }}
                    >
                      Password
                    </Label>
                    <Input
                      secureTextEntry={true}
                      textAlign={I18nManager.isRTL ? "right" : "left"}
                      style={styles.inputText}
                      onChangeText={text => {
                        this.setState({ password: text });
                      }}
                      value={this.state.password}
                    />
                  </Item>
                  <TouchableOpacity
                    style={styles.TouchableOpacityStyle}
                    onPress={this.handleLogin}
                  >
                    <Text style={styles.TouchableOpacityText}>Sign In</Text>
                  </TouchableOpacity>
                </Form>
              </View>
              <View style={styles.view03}>
                <View style={styles.bottomText}>
                  <Text style={styles.bottomText01}>
                    Don&apos;t have an account?
                  </Text>
                  <TouchableOpacity
                    style={styles.signUpTxtBg}
                    onPress={() => alert("Sign Up")}
                  >
                    <Text style={styles.bottomText02}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {};
}

//Connect everything
export default connect(
  mapStateToProps,
  { loginuser }
)(Login);
