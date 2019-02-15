import { LOGIN } from "../actiontypes";
import { clientTriggeredActions, serverTriggeredActions } from "../../params";
import { playSound } from "../../utilities/sound";
const initialState = {
  gamelist: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case clientTriggeredActions.gameLoaded:
      console.log("Client..Game", action);
      playSound("dropcard.wav");
      var copyoflist = [...state.gamelist];
      var existinrec = copyoflist.find(
        a => a.tableid == action.payload.tableid
      );
      var index = copyoflist.indexOf(existinrec);
      if (index == -1) {
        copyoflist.push(action.payload);
      } else {
        copyoflist[index] = action.payload;
      }
      return {
        ...state,
        gamelist: copyoflist
      };
    case clientTriggeredActions.iAmReadyToPlay:
      var copyoflist = [...state.gamelist];
      var existinrec = copyoflist.find(
        a => a.tableid == action.payload.gameinfo.tableid
      );
      var index = copyoflist.indexOf(existinrec);
      if (index == -1) {
        copyoflist.push(action.payload.gameinfo);
      } else {
        copyoflist[index] = action.payload.gameinfo;
      }
      return {
        ...state,
        gamelist: copyoflist
      };
    case serverTriggeredActions.gameViewOpened:
      console.log("Server..Game", action);
      var copyoflist = [...state.gamelist];
      var existinrec = copyoflist.find(
        a => a.tableid == action.eventdata.payload.tableid
      );
      var index = copyoflist.indexOf(existinrec);
      if (index == -1) {
        copyoflist.push(action.eventdata.payload);
      } else {
        copyoflist[index] = action.eventdata.payload;
      }
      return {
        ...state,
        gamelist: copyoflist
      };
    default:
      return state;
  }
}
