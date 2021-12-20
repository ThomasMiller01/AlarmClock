import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./main";
import EditAlarm from "./alarm/views/editAlarm/edit_alarm";
import ColorsManager from "./colors/colors";

const colorsManager = ColorsManager.get();

export const Router = () => {
  const Stack = createStackNavigator();
  const colors = colorsManager.colors();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: colors.text.normal,
        headerStyle: {
          backgroundColor: colors.header.background,
          borderBottomColor: colors.header.border,
          borderBottomWidth: 0.5,
        },
      }}
    >
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="Alarm" component={EditAlarm} />
    </Stack.Navigator>
  );
};
