import { Audio, Asset } from "expo";
import { clientTriggeredActions, serverTriggeredActions } from "../../params";
export const soundMiddleware = ({ getState }) => {
  return next => action => {
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);
    let asset = null;
    switch (action.type) {
      case clientTriggeredActions.gameLoaded:
      case serverTriggeredActions.gameViewOpened:
        asset = Asset.fromModule(require("../../assets/sound/dealcard.wav"));
      case clientTriggeredActions.iAmReadyToPlay:
        asset = Asset.fromModule(require("../../assets/sound/shuffling.mp3"));
      default:
    }
    if (asset) {
      (async () => {
        const soundObject = new Audio.Sound();
        try {
          await soundObject.loadAsync(asset);
          await soundObject.playAsync();
          // Your sound is playing!
        } catch (error) {
          // An error occurred!
        }
      })();
    }
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
};
