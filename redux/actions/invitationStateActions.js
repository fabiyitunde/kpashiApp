import { globalParams } from "../../params";
import { clientTriggeredActions } from "../../params";
import { Alert } from "react-native";

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
