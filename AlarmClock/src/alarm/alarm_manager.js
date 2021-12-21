import BackgroundTimer from "react-native-background-timer";

class AlarmManager {
  static instance = null;

  static get() {
    if (AlarmManager.instance == null) {
      AlarmManager.instance = new AlarmManager();
    }

    return this.instance;
  }

  constructor() {
    console.log("AlarmManager started ...");
  }

  start = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      this.check();
    }, 1000);
  };

  stop = () => {
    BackgroundTimer.stopBackgroundTimer();
  };

  check = () => {
    console.log("check");
  };
}

export default AlarmManager;
