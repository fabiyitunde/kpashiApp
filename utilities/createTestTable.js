import { getNewGUID } from "./newGuid";
import { globalParams } from "../params";
export const createTestTable = () => {
  const tabid = getNewGUID();
  const data = {
    userid: "VP7xoNsxr8dcMTzN20nZuDruy1w2",
    tableid: tabid,
    description: "Johns Table",
    oneroundunit: 2,
    credittoken: "1616166111"
  };
  fetch(`${globalParams.baseurl}/registration/createTable`, {
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
    .catch(error => {
      console.log("Error ...", error);
      error.text().then(errorMessage => {
        Alert.alert("Error", errorMessage);
      });
    });
};
