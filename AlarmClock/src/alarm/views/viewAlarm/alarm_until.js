import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { parseDateDiff } from "../../utils";
import ColorsManager from "../../../colors/colors";

const colorsManager = ColorsManager.get();

class AlarmUntil extends Component {
  constructor(props) {
    super(props);

    this.index = props.index;
    this.getAlarm = props.getAlarm;
    this.timer = null;

    this.colors = colorsManager.colors();
    this.setStyles();
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
      let diff = alarm.getUntil() - current;

      if (diff > 0) {
        let left_obj = parseDateDiff(diff);
        let left = [];

        if (left_obj.days != 0) {
          if (left_obj.hours != 0 || left_obj.minutes != 0) {
            left_obj.days++;
          }

          let unit = left_obj.days == 1 ? "day" : "days";
          left = left_obj.days + " " + unit + " left";
        } else if (left_obj.hours != 0) {
          if (left_obj.minutes != 0) {
            left_obj.hours++;
          }

          let unit = left_obj.hours == 1 ? "hour" : "hours";
          left = left_obj.hours + " " + unit + " left";
        } else if (left_obj.minutes != 0) {
          if (left_obj.seconds != 0) {
            left_obj.minutes++;
          }

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

  render() {
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.text}>{this.state.left}</Text>
      </View>
    );
  }

  setStyles = () => {
    this.styles = StyleSheet.create({
      container: { marginLeft: 5 },
      text: {
        fontSize: 15,
        fontStyle: "italic",
        color: this.colors.text.normal,
      },
    });
  };
}

export default AlarmUntil;
