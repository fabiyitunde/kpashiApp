export const globalParams = {
  baseurl: "https://kpashiserver.herokuapp.com"
};

export const serverTriggeredActions = {
  tableinvite: "tableinvite",
  tableinviteResponse: "tableinviteResponse",
  gameViewOpened: "gameViewOpened",
  currentGameCancelled: "currentGameCancelled",
  playerRemovedFromTable: "playerRemovedFromTable"
};
export const clientTriggeredActions = {
  pendingInvitationTreated: "pendingInvitationTreated",
  pendingInvitationRejected: "pendingInvitationRejected",
  gameLoaded: "gameLoaded",
  iAmReadyToPlay: "iAmReadyToPlay",
  creditLoaded: "creditLoaded",
  currentGameCancelled: "currentGameCancelledByClient",
  playerRemovedFromTable_ClienSide: "playerRemovedFromTable_ClienSide"
};
