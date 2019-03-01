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
        userid: action.payload.userid
      };
    case clientTriggeredActions.loadOnlineUsersList:
      return {
        ...state,
        playerlist: action.playerlist
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
    case clientTriggeredActions.currentGameCancelled:
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
    case clientTriggeredActions.playerRemovedFromTable_ClienSide:
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

    case serverTriggeredActions.currentGameCancelled:
    case serverTriggeredActions.gameViewOpened:
      if (
        action.eventdata.tableinfo != null &&
        action.eventdata.tableinfo != undefined
      ) {
        var copyoflist = [...state.mytablelist];
        var existinrec = copyoflist.find(
          a => a.id == action.eventdata.tableinfo.id
        );
        if (existinrec == null) return state;
        var index = copyoflist.indexOf(existinrec);
        copyoflist[index] = action.eventdata.tableinfo;
        return {
          ...state,
          mytablelist: copyoflist
        };
      } else {
        return state;
      }
    case serverTriggeredActions.playerRemovedFromTable:
      var copyoflist = [...state.mytablelist];
      const hostplayerid = action.eventdata.payload.hostplayerinfo.id;
      var newlist = [];
      if (hostplayerid == state.userid) {
        var existinrec = copyoflist.find(
          a => a.id == action.eventdata.payload.tableinfo.id
        );
        var index = copyoflist.indexOf(existinrec);
        copyoflist[index] = action.eventdata.payload.tableinfo;
        newlist = copyoflist;
      } else {
        newlist = copyoflist.filter(
          a => a.id != action.eventdata.payload.tableinfo.id
        );
      }

      return {
        ...state,
        mytablelist: newlist
      };
    case serverTriggeredActions.playerIsReadyToplay:
      var copyoflist = [...state.mytablelist];
      var existinrec = copyoflist.find(
        a => a.id == action.eventdata.tableinfo.id
      );
      if (existinrec == null) return state;
      var index = copyoflist.indexOf(existinrec);
      copyoflist[index] = action.eventdata.tableinfo;
      return {
        ...state,
        mytablelist: copyoflist
      };
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
