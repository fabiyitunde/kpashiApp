import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";
import invitationStateReducer from "./invitationStateReducer";

export default combineReducers({
  app: appStateReducer,
  inv: invitationStateReducer
});
