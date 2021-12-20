import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { formatDate } from "../../utils";

class AlarmTime extends Component {
  constructor(props) {
    super(props);

    this.getAlarm = props.getAlarm;
    this.index = props.index;
  }

  render() {
    let time = new Date(this.getAlarm(this.index).time.time);
    return (
      <View style={styles.container}>
        <Text style={styles.time}>{formatDate(time, "hh:MM")}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  time: {
    fontSize: 35,
  },
});

export default AlarmTime;
