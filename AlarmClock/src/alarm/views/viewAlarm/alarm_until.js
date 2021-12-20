import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { parseDateDiff, weekdayToNumber } from "../../utils";

class AlarmUntil extends Component {
  constructor(props) {
    super(props);

    this.index = props.index;
    this.getAlarm = props.getAlarm;
    this.timer = null;
  }

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  state = {
    left: null,
  };

  stop = () => {
    clearInterval(this.timer);
  };

  start = () => {
    this.update();
    this.timer = setInterval(() => {
      this.update();
    }, 100);
  };

  update = () => {
    let alarm = this.getAlarm(this.index);
    if (!alarm) return;
    let active = alarm.active;
    if (active) {
      let current = new Date();
      let diff = this.parseUntil() - current;

      if (diff > 0) {
        let left_obj = parseDateDiff(diff);
        let left = [];

        if (left_obj.days != 0) {
          let unit = left_obj.days == 1 ? "day" : "days";
          left = left_obj.days + " " + unit + " left";
        } else if (left_obj.hours != 0) {
          let unit = left_obj.hours == 1 ? "hour" : "hours";
          left = left_obj.hours + " " + unit + " left";
        } else if (left_obj.minutes != 0) {
          let unit = left_obj.minutes == 1 ? "minute" : "minutes";
          left = left_obj.minutes + " " + unit + " left";
        }

        this.setState({ left });
      } else {
        let msg = "Finished";
        if (this.state.left != msg) {
          this.setState({
            left: msg,
          });
        }
      }
    } else {
      let msg = "Stopped";
      if (this.state.left != msg) {
        this.setState({ left: msg });
      }
    }
  };

  parseUntil = () => {
    let alarm = this.getAlarm(this.index);
    let until = {
      date: alarm.time.selected,
      time: alarm.time.time,
    };

    let time = new Date(until.time);
    time.setMilliseconds(0);
    time.setSeconds(0);
    time.setFullYear(2000, 2, 2);
    if (until.date.is_date) {
      let date = new Date(until.date.value);
      date.setMinutes(time.getMinutes());
      date.setHours(time.getHours());
      return date;
    }

    let weekday = until.date.value[0];

    let current = new Date();
    let current_day = current.getDay();
    current.setMilliseconds(0);
    current.setSeconds(0);
    current.setFullYear(2000, 2, 2);

    if (weekdayToNumber(weekday) == current_day && time > current) {
      let now = new Date();
      now.setMinutes(time.getMinutes());
      now.setHours(time.getHours());
      return now;
    }

    let day = this.parseWeekdays(until.date.value, time);
    return day;
  };

  parseWeekdays = (weekdays, time) => {
    let days = [];
    weekdays.forEach((weekday) => {
      days.push(this.getNextWeekDay(weekday, time));
    });

    let day = Math.min.apply(null, days);
    return day;
  };

  getNextWeekDay = (day, time) => {
    let add = weekdayToNumber(day);

    let date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(time.getMinutes());
    date.setHours(time.getHours());
    let mdate = date.getDate() + ((7 + add - date.getDay() - 1) % 7) + 1;
    date.setDate(mdate);

    return date;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.left}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { marginLeft: 5 },
  text: {
    fontSize: 15,
    fontStyle: "italic",
  },
});

export default AlarmUntil;
