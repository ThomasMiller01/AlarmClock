import React, { Component } from "react";
import { Router } from "./router";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

class MainRoute extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
        <Toast />
      </React.Fragment>
    );
  }
}

export default MainRoute;
