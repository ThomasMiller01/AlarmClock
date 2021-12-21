import React from "react";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

import AlarmManager from "./src/alarm/alarm_manager";
import MainRoute from "./src/main_route";

export default function App() {
  let alarmManager = AlarmManager.get();
  alarmManager.start();

  return <MainRoute />;
}
