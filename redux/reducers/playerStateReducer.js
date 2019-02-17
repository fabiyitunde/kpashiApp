import { LOGIN } from "../actiontypes";
import { clientTriggeredActions, serverTriggeredActions } from "../../params";
const initialState = {
  playerinfo: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        playerinfo: action.payload.playerinfo
      };
    case serverTriggeredActions.playerRemovedFromTable:
      return {
        ...state,
        playerinfo: action.eventdata.payload.removeplayerinfo
      };
    default:
      return state;
  }
}
