import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Create main loop, check, if an alarm has triggered, and call a
          callback method
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Main;
