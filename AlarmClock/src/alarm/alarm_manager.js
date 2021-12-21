import React from "react";
import BackgroundTimer from "react-native-background-timer";

import * as Notifications from "expo-notifications";

import Constants from "expo-constants";
import { AndroidNotificationPriority } from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    priority: AndroidNotificationPriority.MAX,
  }),
});

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
    if (
      Constants.appOwnership === "expo" ||
      Constants.deviceName === "Chrome"
    ) {
      this.timer = setInterval(() => {
        this.check();
      }, 10000);
    } else {
      BackgroundTimer.runBackgroundTimer(() => {
        this.check();
      }, 1000);
    }
  };

  stop = () => {
    if (
      Constants.appOwnership === "expo" ||
      Constants.deviceName === "Chrome"
    ) {
      clearInterval(this.timer);
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
  };

  check = () => {
    console.log("check");
    //this.notify();
  };

  notify = async () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "testtitle",
        body: "testbody",
      },
      trigger: {
        seconds: 1,
        repeats: false,
      },
    });
  };
}

export default AlarmManager;
