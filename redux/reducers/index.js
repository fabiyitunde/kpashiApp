import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";

export default combineReducers({
  app: appStateReducer
});
