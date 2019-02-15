import { Audio, Asset } from "expo";
export const playSound = async soundname => {
  const soundpath = `./assets/sound/${soundname}`;
  const asset = Asset.fromModule(require("../assets/sound/dropcard.wav"));
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(asset);
    await soundObject.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  }
};
