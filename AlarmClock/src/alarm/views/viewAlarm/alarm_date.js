import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { formatDate } from "../../utils";
import ColorsManager from "../../../colors/colors";

const colorsManager = ColorsManager.get();

class AlarmDate extends Component {
  constructor(props) {
    super(props);

    this.getAlarm = props.getAlarm;
    this.index = props.index;

    this.colors = colorsManager.colors();
    this.setStyles();
  }

  render() {
    let alarm = this.getAlarm(this.index);
    let date = alarm.time.selected;

    if (date.is_date) {
      return (
        <View style={this.styles.container}>
          <Text style={this.styles.text}>
            {formatDate(new Date(date.value), "dd.mm.yyyy")}
          </Text>
        </View>
      );
    } else {
      let data = date.value.map((elem) => this.getWeekdayShort(elem));

      return (
        <View style={this.styles.container}>
          <Text style={this.styles.text}>{data.join(", ")}</Text>
        </View>
      );
    }
  }

  getWeekdayShort = (day) => {
    let weekdays = [
      {
        name: "Monday",
        short: "Mon",
      },
      {
        name: "Tuesday",
        short: "Tue",
      },
      {
        name: "Wednesday",
        short: "Wed",
      },
      {
        name: "Thursday",
        short: "Thu",
      },
      {
        name: "Friday",
        short: "Fri",
      },
      {
        name: "Saturday",
        short: "Sat",
      },
      {
        name: "Sunday",
        short: "Sun",
      },
    ];

    let index = weekdays.findIndex((elem) => elem.name == day);
    return weekdays[index].short;
  };

  setStyles = () => {
    this.styles = StyleSheet.create({
      container: {
        marginRight: 5,
      },
      text: {
        fontSize: 15,
        color: this.colors.text.normal,
      },
    });
  };
}

export default AlarmDate;
