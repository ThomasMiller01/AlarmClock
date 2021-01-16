import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Main from "./main";
import EditAlarm from "./alarm/views/edit_alarm";

export const createRootNavigator = () => {
  return createAppContainer(
    createStackNavigator({
      Main: {
        screen: Main,
        navigationOptions: {
          title: "Home",
        },
      },
      Alarm: {
        screen: EditAlarm,
        navigationOptions: {
          title: "Alarm",
        },
      },
    })
  );
};
