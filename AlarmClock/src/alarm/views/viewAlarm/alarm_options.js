import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import ColorsManager from "../../../colors/colors";

const colorsManager = ColorsManager.get();

class AlarmOptions extends Component {
  constructor(props) {
    super(props);

    this.index = props.index;
    this.remove = props.remove;

    this.colors = colorsManager.colors();
    this.setStyles();
  }

  render() {
    return (
      <View style={this.styles.container}>
        <Button title="remove" onPress={() => this.remove(this.index)} />
      </View>
    );
  }

  setStyles = () => {
    this.styles = StyleSheet.create({
      container: {},
    });
  };
}

export default AlarmOptions;
