import { LOGIN } from "../actiontypes";
import { clientTriggeredActions, serverTriggeredActions } from "../../params";
const initialState = {
  loggedIn: false,
  mytablelist: [],
  playerlist: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        mytablelist: action.payload.mytablelist,
        playerlist: action.payload.playerlist
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
