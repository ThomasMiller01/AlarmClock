import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { formatDate } from "../../utils";

class AlarmTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: props.time,
    };
  }

  state = {
    time: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.time}>{formatDate(this.state.time, "hh:MM")}</Text>
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
