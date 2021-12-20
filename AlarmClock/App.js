import React from "react";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

import MainRoute from "./src/main_route";

export default function App() {
  return <MainRoute />;
}
