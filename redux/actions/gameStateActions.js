import { globalParams } from "../../params";
import { clientTriggeredActions } from "../../params";
import { Alert } from "react-native";

export const loadGame = (tableid, userid, navigationcallback) => dispatch => {
  const data = { tableid, userid };
  fetch(`${globalParams.baseurl}/game/openGame`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if (!resp.ok) {
        throw resp;
      }
      return resp.json();
    })
    .then(data => {
      dispatch({
        type: clientTriggeredActions.gameLoaded,
        payload: data.gameinfo
      });
      navigationcallback();
    })
    .catch(error => {
      error.text().then(errorMessage => {
        Alert.alert("Error", errorMessage);
      });
    });
};
export const shuffleCards = (gameid, userid) => dispatch => {
  const data = { gameid, userid };
  fetch(`${globalParams.baseurl}/game/shuffleCards`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if (!resp.ok) {
        throw resp;
      }
      return resp.json();
    })
    .then(data => {
      dispatch({
        type: clientTriggeredActions.gameLoaded,
        payload: data.gameinfo
      });
    })
    .catch(error => {
      error.text().then(errorMessage => {
        Alert.alert("Error", errorMessage);
      });
    });
};
export const dealcards = (gameid, userid) => dispatch => {
  const data = { gameid, userid };
  fetch(`${globalParams.baseurl}/game/dealCards`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if (!resp.ok) {
        throw resp;
      }
      return resp.json();
    })
    .then(data => {
      dispatch({
        type: clientTriggeredActions.gameLoaded,
        payload: data.gameinfo
      });
    })
    .catch(error => {
      console.log("Error ...", error);
      error.text().then(errorMessage => {
        Alert.alert("Error", errorMessage);
      });
    });
};

export const startNewGame = (userid, tableid) => dispatch => {
  const data = { userid, tableid };
  fetch(`${globalParams.baseurl}/game/startNewGame`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if (!resp.ok) {
        throw resp;
      }
      return resp.json();
    })
    .then(data => {
      dispatch({
        type: clientTriggeredActions.gameLoaded,
        payload: data.gameinfo
      });
    })
    .catch(error => {
      error.text().then(errorMessage => {
        Alert.alert("Error", errorMessage);
      });
    });
};

export const iAmReadyToPlay = (userid, tableid) => dispatch => {
  const data = { userid, tableid };
  fetch(`${globalParams.baseurl}/game/iAmReadyToPlay`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if (!resp.ok) {
        throw resp;
      }
      return resp.json();
    })
    .then(data => {
      dispatch({
        type: clientTriggeredActions.iAmReadyToPlay,
        payload: data
      });
    })
    .catch(error => {
      error.text().then(errorMessage => {
        Alert.alert("Error", errorMessage);
      });
    });
};

export const dropCard = (gameid, userid, suittype, cardtype) => dispatch => {
  const data = { gameid, userid, suittype, cardtype };
  fetch(`${globalParams.baseurl}/game/dropCard`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if (!resp.ok) {
        throw resp;
      }
      return resp.json();
    })
    .then(data => {
      dispatch({
        type: clientTriggeredActions.gameLoaded,
        payload: data.gameinfo,
        tableinfo: data.tableinfo
      });
    })
    .catch(error => {
      error.text().then(errorMessage => {
        Alert.alert("Error", errorMessage);
      });
    });
};
export const cancelCurrentGame = (userid, tableid) => dispatch => {
  const data = { tableid, userid };
  fetch(`${globalParams.baseurl}/game/cancelCurrentGame`, {
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
        type: clientTriggeredActions.currentGameCancelled,
        payload: data
      });
    })
    .catch(error => {
      error.text().then(errorMessage => {
        Alert.alert("Error", errorMessage);
      });
    });
};
