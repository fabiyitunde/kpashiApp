import { Permissions, Notifications } from "expo";
import { getItemFromLocalStorage } from "./localstore";
import { globalParams } from "../params";
export const registerForPushNotifications = async () => {
  var authdata = JSON.parse(await getItemFromLocalStorage("auth"));
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  const data = { userid: authdata.id, tokenid: token };
  fetch(`${globalParams.baseurl}/registration/registerNotificationToken`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => {
      if (!resp.ok) throw resp;
      return resp.json();
    })
    .then(data => {})
    .catch(error => {
      error.text().then(errorMessage => {
        Alert.alert("Error", errorMessage);
      });
    });
};
