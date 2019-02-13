import { LOGIN } from "../actiontypes";
import { serverTriggeredActions } from "../../params";
import { clientTriggeredActions } from "../../params";

const initialState = {
  invitations: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case serverTriggeredActions.tableinvite:
      var existinginvitations = [...state.invitations];
      var existinginvitationtable = existinginvitations.find(
        a => a.id == action.eventdata.payload.id
      );
      if (existinginvitationtable == null) {
        existinginvitations.push(action.eventdata.payload);
      }

      return {
        ...state,
        invitations: existinginvitations
      };
    case clientTriggeredActions.pendingInvitationTreated:
      var existinginvitations = [...state.invitations];
      var fileteredlist = existinginvitations.filter(
        a => a.id != action.payload.id
      );
      return {
        ...state,
        invitations: fileteredlist
      };
    case clientTriggeredActions.pendingInvitationRejected:
      var existinginvitations = [...state.invitations];
      var fileteredlist = existinginvitations.filter(
        a => a.id != action.payload.id
      );
      return {
        ...state,
        invitations: fileteredlist
      };
    default:
      return state;
  }
}
