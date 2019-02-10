import firebase from "./firebase";

export const logIn = async () => {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions
    } = await Expo.Facebook.logInWithReadPermissionsAsync("459760637882359", {
      permissions: ["public_profile", "email"]
    });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      await signInWithFacebook(token);
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      const result = await response.json();

      alert("Logged in!", `Hi ${result.name}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

function signInWithFacebook(fbToken) {
  return new Promise((resolve, reject) => {
    const credential = provider.credential(fbToken);
    auth
      .signInWithCredential(credential)
      .then(user => {
        //Get the user object from the realtime database
        firebase.database
          .ref("users")
          .child(user.uid)
          .once("value")
          .then(snapshot => {
            const exists = snapshot.val() !== null;

            //if the user exist in the DB, replace the user variable with the returned snapshot
            if (exists) user = snapshot.val();

            if (exists) console.log(user);
            resolve({ exists, user });
          })
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  });
}
