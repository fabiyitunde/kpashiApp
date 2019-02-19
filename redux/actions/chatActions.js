import { getSocketIo } from "../../utilities/socketIOHandler";
import { getNewGUID } from "../../utilities/newGuid";
import { clientTriggeredActions, serverTriggeredActions } from "../../params";
const io = getSocketIo();
export const sendmessage = (playerinfo, text, tableid) => dispatch => {
  var message = {};
  message.address = "Table" + tableid;
  message.text = text;
  message.from = playerinfo.fullname;
  message.photourl = playerinfo.photourl;
  message.time = new Date();
  message.id = getNewGUID();
  message.tableid = tableid;
  message.servertime = new Date();

  io.emit("send", message);
  dispatch({
    type: clientTriggeredActions.messageSent,
    message: message
  });
};
export const startListeningForIncomingMessages = tablelist => dispatch => {
  for (let index = 0; index < tablelist.length; index++) {
    const table = tablelist[index];

    const address = "Table" + table.id;
    io.on(address, message => {
      message.time = new Date();
      dispatch({
        type: serverTriggeredActions.messageRecieved,
        message: message
      });
    });
  }
};
export const closeChatOverLayForTable = tableid => dispatch => {
  dispatch({
    type: clientTriggeredActions.closeChatOverlay,
    tableid: tableid
  });
};
export const openChatOverLayForTable = tableid => dispatch => {
  dispatch({
    type: clientTriggeredActions.openChatOverlay,
    tableid: tableid
  });
};
