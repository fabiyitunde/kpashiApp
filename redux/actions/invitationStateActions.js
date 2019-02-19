import { globalParams } from "../../params";
import { clientTriggeredActions, serverTriggeredActions } from "../../params";
import { Alert } from "react-native";
import { getSocketIo } from "../../utilities/socketIOHandler";
const io = getSocketIo();
export const acceptInvitation = (userid, credittoken, tableid) => dispatch => {
  const data = { userid, credittoken, tableid };
  fetch(`${globalParams.baseurl}/registration/joinTable`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if (!resp.ok) throw resp;
      return resp.json();
    })
    .then(data => {
      dispatch({
        type: clientTriggeredActions.pendingInvitationTreated,
        payload: data.tableinfo
      });
      const address = "Table" + data.tableinfo.id;
      io.on(address, message => {
        message.time = new Date();
        dispatch({
          type: serverTriggeredActions.messageRecieved,
          message: message
        });
      });
    })
    .catch(error => {
      error.text().then(errorMessage => {
        Alert.alert("Error", errorMessage);
      });
    });
};
export const rejectInvitation = tableinfo => dispatch => {
  dispatch({
    type: clientTriggeredActions.pendingInvitationRejected,
    payload: tableinfo
  });
};
