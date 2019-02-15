import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";
import invitationStateReducer from "./invitationStateReducer";
import gameStateReducer from "./gameStateReducer";

export default combineReducers({
  app: appStateReducer,
  inv: invitationStateReducer,
  game: gameStateReducer
});
