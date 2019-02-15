import { LOGIN } from "../actiontypes";
import { clientTriggeredActions, serverTriggeredActions } from "../../params";
const initialState = {
  loggedIn: false,
  mytablelist: [],
  playerlist: [],
  userid: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        mytablelist: action.payload.mytablelist,
        playerlist: action.payload.playerlist,
        userid: action.payload.userid
      };

    case clientTriggeredActions.pendingInvitationTreated:
      var copyoflist = [...state.mytablelist];
      var existinrec = copyoflist.find(a => a.id == action.payload.id);
      var index = copyoflist.indexOf(existinrec);
      if (index == -1) {
        copyoflist.push(action.payload);
      }
      return {
        ...state,
        mytablelist: copyoflist
      };
    case clientTriggeredActions.creditLoaded:
      var copyoflist = [...state.mytablelist];
      var existinrec = copyoflist.find(a => a.id == action.payload.id);
      var index = copyoflist.indexOf(existinrec);
      copyoflist[index] = action.payload;
      return {
        ...state,
        mytablelist: copyoflist
      };
    case clientTriggeredActions.iAmReadyToPlay:
      var copyoflist = [...state.mytablelist];
      var existinrec = copyoflist.find(
        a => a.id == action.payload.tableinfo.id
      );
      var index = copyoflist.indexOf(existinrec);
      copyoflist[index] = action.payload.tableinfo;
      return {
        ...state,
        mytablelist: copyoflist
      };
    case clientTriggeredActions.gameLoaded:
      console.log("Client..App", action);
      if (action.tableinfo != null && action.tableinfo != undefined) {
        var copyoflist = [...state.mytablelist];
        var existinrec = copyoflist.find(a => a.id == action.tableinfo.id);
        var index = copyoflist.indexOf(existinrec);
        copyoflist[index] = action.tableinfo;
        return {
          ...state,
          mytablelist: copyoflist
        };
      } else {
        return state;
      }
    case serverTriggeredActions.gameViewOpened:
      console.log("Server..App", action);
      if (
        action.eventdata.tableinfo != null &&
        action.eventdata.tableinfo != undefined
      ) {
        var copyoflist = [...state.mytablelist];
        var existinrec = copyoflist.find(
          a => a.id == action.eventdata.tableinfo.id
        );
        var index = copyoflist.indexOf(existinrec);
        copyoflist[index] = action.eventdata.tableinfo;
        return {
          ...state,
          mytablelist: copyoflist
        };
      } else {
        return state;
      }
    case serverTriggeredActions.tableinviteResponse:
      var copyoflist = [...state.mytablelist];
      var existinrec = copyoflist.find(
        a => a.id == action.eventdata.payload.id
      );
      var index = copyoflist.indexOf(existinrec);
      copyoflist[index] = action.eventdata.payload;
      return {
        ...state,
        mytablelist: copyoflist
      };
    default:
      return state;
  }
}
