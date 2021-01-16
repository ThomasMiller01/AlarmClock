import React, { Component } from "react";
import { createRootNavigator } from "./router";

class MainRoute extends Component {
  render() {
    const Layout = createRootNavigator();
    return <Layout />;
  }
}

export default MainRoute;
