import openSocket from "socket.io-client";
import { globalParams } from "../params";
import { getItemFromLocalStorage } from "../utilities/localstore";
const socket = openSocket(globalParams.baseurl);

export function listenForUserEvents(userid, dispatch) {
  const eventname = "userevent" + userid;
  socket.on(eventname, eventdata => {
    dispatch({ type: eventdata.address, eventdata: eventdata });
  });
}
