import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class AlarmName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.index,
      name: props.name,
    };
  }

  state = {
    id: null,
    name: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.name}</Text>
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
