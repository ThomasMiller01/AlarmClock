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
      let data = date.value.map((elem) => elem.substring(0, 2));

      return (
        <View style={styles.container}>
          <Text style={styles.text}>{data.join(", ")}</Text>
        </View>
      );
    }
  }
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
