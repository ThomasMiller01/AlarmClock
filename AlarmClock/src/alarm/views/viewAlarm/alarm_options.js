import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";

class AlarmOptions extends Component {
  constructor(props) {
    super(props);

    this.index = props.index;
    this.remove = props.remove;
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="remove" onPress={() => this.remove(this.index)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default AlarmOptions;
