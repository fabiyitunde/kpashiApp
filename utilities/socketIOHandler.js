import openSocket from "socket.io-client";
import { globalParams } from "../params";
const socket = openSocket(globalParams.baseurl);

export const getSocketIo = () => {
  return socket;
};
export function listenForUserEvents(userid, dispatch) {
  const eventname = "userevent" + userid;
  socket.emit("amOnLine", userid);
  socket.on(eventname, eventdata => {
    dispatch({ type: eventdata.address, eventdata: eventdata });
  });
  socket.on("reconnect", function() {
    socket.emit("amOnLine", userid);
  });
}
