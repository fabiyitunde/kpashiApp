export const globalParams = {
  baseurl: "https://kpashiserver.herokuapp.com"
};

export const serverTriggeredActions = {
  tableinvite: "tableinvite",
  tableinviteResponse: "tableinviteResponse",
  gameViewOpened: "gameViewOpened",
  currentGameCancelled: "currentGameCancelled",
  playerRemovedFromTable: "playerRemovedFromTable",
  messageRecieved: "messageRecieved",
  playerIsReadyToplay: "playerIsReadyToplay"
};
export const clientTriggeredActions = {
  pendingInvitationTreated: "pendingInvitationTreated",
  pendingInvitationRejected: "pendingInvitationRejected",
  gameLoaded: "gameLoaded",
  iAmReadyToPlay: "iAmReadyToPlay",
  creditLoaded: "creditLoaded",
  currentGameCancelled: "currentGameCancelledByClient",
  playerRemovedFromTable_ClienSide: "playerRemovedFromTable_ClienSide",
  messageSent: "messageSent",
  openChatOverlay: "openChatOverlay",
  closeChatOverlay: "closeChatOverlay",
  loadOnlineUsersList: "loadOnlineUsersList"
};
