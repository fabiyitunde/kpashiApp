import { Platform, StyleSheet, Dimensions, I18nManager } from "react-native";
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  main: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT
  },
  overlaymain: {
    width: Metrics.WIDTH * 0.7
  },
  backArrow: {
    width: 30,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  imgContainer: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.4
  },

  topContent: {
    flexDirection: "column",
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.4,
    backgroundColor: "rgba(0,0,0,0.3)"
  },

  bottomContent: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.4
  },

  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: Metrics.HEIGHT * 0.05,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05
  },

  left: {
    flex: 1
  },

  body: {
    flex: 2,
    alignItems: "center"
  },

  right: {
    flex: 1
  },

  backArrow2: {
    color: Colors.snow
  },

  headerTxt: {
    marginTop: 2,
    color: "white",
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.sfuiDisplaySemibold
  },
  headerTxt2: {
    marginTop: 1,
    color: "black",
    fontSize: Fonts.moderateScale(20),
    fontFamily: Fonts.type.sfuiDisplayBold,
    justifyContent: "center"
  },

  profileImg: {
    width: Metrics.WIDTH * 0.18,
    height: Metrics.WIDTH * 0.18,
    borderRadius: Metrics.WIDTH * 0.09,
    alignSelf: "center"
  },

  shadowOneProfileImg: {
    width: Metrics.WIDTH * 0.22,
    height: Metrics.WIDTH * 0.22,
    borderRadius: Metrics.WIDTH * 0.11,
    alignSelf: "center",
    backgroundColor: "#FFFFFF08",
    justifyContent: "center"
  },

  shadowTwoProfileImg: {
    width: Metrics.WIDTH * 0.26,
    height: Metrics.WIDTH * 0.26,
    borderRadius: Metrics.WIDTH * 0.13,
    alignSelf: "center",
    backgroundColor: "#FFFFFF15",
    justifyContent: "center",
    marginTop: Metrics.WIDTH * 0.01
  },

  btnSec: {
    width: Metrics.WIDTH * 0.42,
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 0.05,
    alignItems: "center",
    justifyContent: "center"
  },

  addUserBg: {
    backgroundColor: "#0691ce",
    width: Metrics.WIDTH * 0.12,
    height: Metrics.WIDTH * 0.12,
    borderRadius: Metrics.WIDTH * 0.06,
    justifyContent: "center",
    alignItems: "center"
  },

  commentBg: {
    backgroundColor: "#f7412d",
    width: Metrics.WIDTH * 0.12,
    height: Metrics.WIDTH * 0.12,
    marginLeft: Metrics.WIDTH * 0.04,
    borderRadius: Metrics.WIDTH * 0.06,
    justifyContent: "center",
    alignItems: "center"
  },

  callBg: {
    backgroundColor: "#00c160",
    width: Metrics.WIDTH * 0.12,
    height: Metrics.WIDTH * 0.12,
    marginLeft: Metrics.WIDTH * 0.04,
    borderRadius: Metrics.WIDTH * 0.06,
    justifyContent: "center",
    alignItems: "center"
  },

  userCommentImage: {
    width: Metrics.WIDTH * 0.06,
    height: Metrics.HEIGHT * 0.06,
    alignSelf: "center",
    resizeMode: "contain",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  },

  followerFollowingBg: {
    width: Metrics.WIDTH * 0.26,
    flexDirection: "column"
  },

  likeBg: {
    flexDirection: "column",
    width: Metrics.WIDTH * 0.27
  },

  divider: {
    width: 1,
    height: Metrics.HEIGHT * 0.04,
    backgroundColor: "#d7d7d7"
  },

  followerFollowingDetailsBg: {
    borderRadius: 5,
    backgroundColor: "#2d324f",
    width: Metrics.WIDTH * 0.81,
    alignSelf: "center",
    flexDirection: "row",
    bottom: 0,
    zIndex: 10
  },

  countLabelBg: {
    width: Metrics.WIDTH * 0.27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  labelTxt: {
    color: Colors.snow,
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(12),
    alignSelf: "center"
  },

  countTxt: {
    color: Colors.snow,
    fontFamily: Fonts.type.sfuiDisplayBold,
    fontSize: Fonts.moderateScale(15),
    alignSelf: "center"
  },

  container: {
    flex: 1
  },

  activeLabel: {
    color: "#595959",
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(15)
  },

  normalLabel: {
    color: "#c6c6c6",
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(15)
  },

  imageBottomBg: {
    backgroundColor: "#e6e6e6",
    position: "absolute",
    bottom: 0,
    height: Metrics.HEIGHT * 0.05,
    width: Metrics.WIDTH
  }
});

export default styles;
