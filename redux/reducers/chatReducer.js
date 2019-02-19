import { clientTriggeredActions, serverTriggeredActions } from "../../params";
const initialState = {
  messagesnotrecieved: [],
  messagesrecieved: [],
  chatoverlaylist: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case clientTriggeredActions.messageSent:
      var copylist = [...state.messagesnotrecieved];
      copylist.push(action.message);
      return {
        ...state,
        messagesnotrecieved: copylist
      };
    case clientTriggeredActions.openChatOverlay:
      return {
        ...state,
        chatoverlaylist: ShowOverlayWhenButtonIsClicked(state, action)
      };
    case clientTriggeredActions.closeChatOverlay:
      return {
        ...state,
        chatoverlaylist: CloseOverlay(state, action)
      };
    case serverTriggeredActions.messageRecieved:
      var copylistofMsgNotRecieved = [...state.messagesnotrecieved];
      copylistofMsgNotRecieved = copylistofMsgNotRecieved.filter(
        a => a.id != action.message.id
      );
      var copyofMessageRecieved = [...state.messagesrecieved];
      var existingmessage = copyofMessageRecieved.find(
        a => a.id == action.message.id
      );
      if (existingmessage == null) copyofMessageRecieved.push(action.message);
      return {
        ...state,
        messagesnotrecieved: copylistofMsgNotRecieved,
        messagesrecieved: copyofMessageRecieved,
        chatoverlaylist: ShowOverlayWhenMessageIsRecived(state, action)
      };
    default:
      return state;
  }
}
const ShowOverlayWhenMessageIsRecived = (state, action) => {
  var copylist = [...state.chatoverlaylist];
  var tableoverlay = copylist.find(a => a.tableid == action.message.tableid);
  if (tableoverlay == null) {
    copylist.push({ tableid: action.message.tableid, show: true });
  } else {
    tableoverlay.show = true;
  }
  return copylist;
};
const ShowOverlayWhenButtonIsClicked = (state, action) => {
  var copylist = [...state.chatoverlaylist];
  var tableoverlay = copylist.find(a => a.tableid == action.tableid);
  if (tableoverlay == null) {
    copylist.push({ tableid: action.tableid, show: true });
  } else {
    tableoverlay.show = true;
  }
  return copylist;
};
const CloseOverlay = (state, action) => {
  var copylist = [...state.chatoverlaylist];
  var tableoverlay = copylist.find(a => a.tableid == action.tableid);
  if (tableoverlay == null) {
    copylist.push({ tableid: action.tableid, show: false });
  } else {
    tableoverlay.show = false;
  }
  return copylist;
};
