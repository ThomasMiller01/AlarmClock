import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { parseDateDiff, weekdayToNumber } from "../../utils";

class AlarmUntil extends Component {
  constructor(props) {
    super(props);

    this.index = props.index;
    this.until = props.until;
    this.getActive = props.getActive;
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
    let active = this.getActive(this.index);
    if (active) {
      let current = new Date();
      let diff = this.parseUntil() - current;

      if (diff > 0) {
        let left_obj = parseDateDiff(diff);
        let left = "";

        if (left_obj.days != 0) {
          if (left_obj.hours != 0 || left_obj.minutes != 0) {
            left_obj.days++;
          }
          left = left_obj.days + " days left";
        } else if (left_obj.hours != 0) {
          if (left_obj.minutes != 0) {
            left_obj.minutes++;
          }
          left = left_obj.hours + " hours left";
        } else {
          left = left_obj.minutes + " minutes left";
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
    let time = new Date(this.until.time);
    time.setMilliseconds(0);
    time.setSeconds(0);
    time.setFullYear(2000, 2, 2);
    if (this.until.date.is_date) {
      let date = new Date(this.until.date.value);
      date.setMinutes(time.getMinutes());
      date.setHours(time.getHours());
      return date;
    }

    let weekday = this.until.date.value[0];

    let current = new Date();
    current.setMilliseconds(0);
    current.setSeconds(0);
    current.setFullYear(2000, 2, 2);

    if (weekdayToNumber(weekday) == current.getDay() && time > current) {
      let now = new Date();
      now.setMinutes(time.getMinutes());
      now.setHours(time.getHours());
      return now;
    }

    let day = this.getNextWeekDay(weekday, time);
    return day;
  };

  getNextWeekDay = (day, time) => {
    let add = weekdayToNumber(day);

    let date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(time.getMinutes());
    date.setHours(time.getHours());
    date.setDate(date.getDate() + (((7 - date.getDay()) % 7) + add));

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
