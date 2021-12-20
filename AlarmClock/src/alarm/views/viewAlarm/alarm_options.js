import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";

class AlarmOptions extends Component {
  constructor(props) {
    super(props);

    this.index = props.index;
    this.view = props.view;
    this.remove = props.remove;
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="edit" onPress={() => this.view(this.index)} />
        <Button title="remove" onPress={() => this.remove(this.index)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default AlarmOptions;
