import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { formatDate } from "../../utils";
import ColorsManager from "../../../colors/colors";

const colorsManager = ColorsManager.get();

class AlarmTime extends Component {
  constructor(props) {
    super(props);

    this.getAlarm = props.getAlarm;
    this.index = props.index;

    this.colors = colorsManager.colors();
    this.setStyles();
  }

  render() {
    let time = new Date(this.getAlarm(this.index).time.time);
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.time}>{formatDate(time, "hh:MM")}</Text>
      </View>
    );
  }

  setStyles = () => {
    this.styles = StyleSheet.create({
      container: {},
      time: {
        fontSize: 35,
        color: this.colors.text.normal,
      },
    });
  };
}

export default AlarmTime;
