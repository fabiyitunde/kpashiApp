import { clientTriggeredActions, serverTriggeredActions } from "../../params";
import { getSocketIo } from "../../utilities/socketIOHandler";
const io = getSocketIo();
export const StarListeningWhenTableInvitationAccepted = ({ getState }) => {
  return next => action => {
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    switch (action.type) {
      case serverTriggeredActions.playerRemovedFromTable:
        processplayerRemovedFromTable(action, getState());

      default:
    }
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
};

const processplayerRemovedFromTable = (action, state) => {
  const hostplayerid = action.eventdata.payload.hostplayerinfo.id;

  if (hostplayerid != state.app.userid) {
    const address = "Table" + action.eventdata.payload.tableinfo.id;
    io.removeListener(address);
  }
};
