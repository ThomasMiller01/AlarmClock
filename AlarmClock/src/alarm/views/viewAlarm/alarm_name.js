import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class AlarmName extends Component {
  constructor(props) {
    super(props);

    this.getAlarm = props.getAlarm;
    this.index = props.index;
  }

  render() {
    let name = this.getAlarm(this.index).name;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default AlarmName;
