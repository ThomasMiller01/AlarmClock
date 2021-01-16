import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

class AlarmViewer extends Component {
  constructor(props) {
    super(props);

    this.index = props.index;
    this.view = props.view;
    this.remove = props.remove;

    this.state = {
      name: props.name,
      time: props.time,
      alarm_id: props.alarm_id,
    };
  }

  state = {
    name: null,
    time: null,
    alarm_id: null,
  };

  render() {
    return (
      <View>
        <Text>name: {this.state.name}</Text>
        <Text>time: {this.state.time}</Text>
        <Button title="edit" onPress={() => this.view(this.index)} />
        <Button title="remove" onPress={() => this.remove(this.index)} />
      </View>
    );
  }
}

export default AlarmViewer;
