import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";
import invitationStateReducer from "./invitationStateReducer";
import playerStateReducer from "./playerStateReducer";
import gameStateReducer from "./gameStateReducer";

export default combineReducers({
  app: appStateReducer,
  inv: invitationStateReducer,
  game: gameStateReducer,
  player: playerStateReducer
});
