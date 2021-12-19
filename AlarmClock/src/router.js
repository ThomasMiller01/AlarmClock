import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./main";
import EditAlarm from "./alarm/views/editAlarm/edit_alarm";

export const Router = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="Alarm" component={EditAlarm} />
    </Stack.Navigator>
  );
};
