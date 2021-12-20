import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { formatDate } from "../../utils";

class AlarmDate extends Component {
  constructor(props) {
    super(props);

    this.getAlarm = props.getAlarm;
    this.index = props.index;
  }

  render() {
    let alarm = this.getAlarm(this.index);
    let date = alarm.time.selected;

    if (date.is_date) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            {formatDate(new Date(date.value), "dd.mm.yyyy")}
          </Text>
        </View>
      );
    } else {
      let data = date.value.map((elem) => this.getWeekdayShort(elem));

      return (
        <View style={styles.container}>
          <Text style={styles.text}>{data.join(", ")}</Text>
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
        short: "Thur",
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
}

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
  },
  text: {
    fontSize: 15,
  },
});

export default AlarmDate;
