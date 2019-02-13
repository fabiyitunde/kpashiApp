import * as Sound from "react-native-sound";

export const playSound = soundname => {
  const soundpath = `../assets/sound/${soundname}.wav`;
  var whoosh = new Sound(soundpath, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("failed to load the sound", error);
      return;
    }
    // loaded successfully
    console.log(
      "duration in seconds: " +
        whoosh.getDuration() +
        "number of channels: " +
        whoosh.getNumberOfChannels()
    );

    // Play the sound with an onEnd callback
    whoosh.play(success => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
    });
  });
};
