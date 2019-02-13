import { globalParams } from "../../params";
import { saveItemToLocalStorage } from "../../utilities/localstore";
import { LOGIN } from "../actiontypes";
import { Alert } from "react-native";
import { listenForUserEvents } from "../../utilities/socketIOHandler";
export const loggin_authenticated_user = userid => dispatch => {
  fetch(`${globalParams.baseurl}/registration/getMyTableList/${userid}`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" }
  })
    .then(resp => resp.json())
    .then(data => {
      dispatch({
        type: LOGIN,
        payload: { mytablelist: data.mytablelist, playerlist: data.playerlist }
      });
      listenForUserEvents(userid, dispatch);
    })
    .catch(error => alert(error));
};

export const loginuser = (email, password) => dispatch => {
  var onResponseReceived = async data => {
    var authdata = JSON.stringify(data.userinfo);
    await saveItemToLocalStorage("auth", authdata);
    dispatch({
      type: LOGIN,
      payload: { mytablelist: data.mytablelist, playerlist: data.playerlist }
    });
    listenForUserEvents(data.userinfo.id, dispatch);
  };
  const data = { email, password };
  fetch(`${globalParams.baseurl}/registration/logIn`, {
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
      (async () => await onResponseReceived(data))();
    })
    .catch(error => {
      error.text().then(errorMessage => {
        Alert.alert("Error", errorMessage);
      });
    });
};
export const initSocketIO = () => dispatch => {
  listenForUserEvents(dispatch);
};
