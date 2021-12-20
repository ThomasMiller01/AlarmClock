import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import ColorsManager from "../../../colors/colors";

const colorsManager = ColorsManager.get();

class AlarmName extends Component {
  constructor(props) {
    super(props);

    this.getAlarm = props.getAlarm;
    this.index = props.index;

    this.colors = colorsManager.colors();
    this.setStyles();
  }

  render() {
    let name = this.getAlarm(this.index).name;
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.text}>{name}</Text>
      </View>
    );
  }

  setStyles = () => {
    this.styles = StyleSheet.create({
      container: {},
      text: {
        fontSize: 20,
        marginLeft: 10,
        color: this.colors.text.normal,
      },
    });
  };
}

export default AlarmName;
