import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Vibration,
  Button,
  Switch,
  Text,
} from "react-native";
import Modal from "react-native-modal";

const ONE_S_IN_MS = 1000;

class EditVibration extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.alarm = this.props.alarm;

    this.state.vibration.enabled = this.alarm.vibration.enabled;
    let index = this.state.patterns.findIndex(
      (elem) => elem.name == this.alarm.vibration.pattern.name
    );
    this.state.patterns[index].selected = true;
  }

  state = {
    vibration: {
      enabled: false,
    },
    visible_patterns: false,
    patterns: [
      {
        name: "Basic call",
        value: [0, 1.25 * ONE_S_IN_MS],
        repeat: false,
        selected: false,
      },
      {
        name: "Riiing",
        value: [
          0,
          0.75 * ONE_S_IN_MS,
          0.6 * ONE_S_IN_MS,
          0.75 * ONE_S_IN_MS,
          0.6 * ONE_S_IN_MS,
        ],
        repeat: false,
        selected: false,
      },
      {
        name: "Heartbeat",
        value: [
          0,
          0.2 * ONE_S_IN_MS,
          0.05 * ONE_S_IN_MS,
          0.2 * ONE_S_IN_MS,
          0.6 * ONE_S_IN_MS,
          0.2 * ONE_S_IN_MS,
          0.05 * ONE_S_IN_MS,
          0.2 * ONE_S_IN_MS,
        ],
        repeat: false,
        selected: false,
      },
      {
        name: "2 to 3",
        value: [
          0,
          0.25 * ONE_S_IN_MS,
          0.2 * ONE_S_IN_MS,
          0.25 * ONE_S_IN_MS,
          0.15 * ONE_S_IN_MS,
          0.15 * ONE_S_IN_MS,
          0.075 * ONE_S_IN_MS,
          0.15 * ONE_S_IN_MS,
          0.075 * ONE_S_IN_MS,
          0.15 * ONE_S_IN_MS,
          0.35 * ONE_S_IN_MS,
        ],
        repeat: false,
        selected: false,
      },
    ],
  };

  getVibration = () => {
    let enabled = this.state.vibration.enabled;
    let pattern = this.state.patterns.filter((p) => p.selected)[0];
    let minified_pattern = {
      name: pattern.name,
      value: pattern.value,
    };
    return { enabled, pattern: minified_pattern };
  };

  onChangeSwitch = () => {
    let vibration = this.state.vibration;
    vibration.enabled = vibration.enabled ? false : true;
    this.setState({ vibration });
  };

  onPressPattern = (pattern) => {
    Vibration.vibrate(pattern.value, pattern.repeat);
    let patterns = this.state.patterns;
    patterns.forEach((p) => {
      p.selected = false;
    });
    let index = patterns.indexOf(pattern);
    patterns[index].selected = true;
    this.setState({ patterns });
  };

  renderSelectedPattern = () => {
    if (this.state.vibration.enabled) {
      let patterns = this.state.patterns;
      let selected = patterns.filter((p) => p.selected)[0];
      return selected.name;
    } else {
      return "Off";
    }
  };

  toggleVibrationPatterns = () => {
    let visible_patterns = this.state.visible_patterns;
    if (visible_patterns) {
      visible_patterns = false;
      Vibration.cancel();
    } else {
      visible_patterns = true;
    }
    this.setState({ visible_patterns });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={this.toggleVibrationPatterns}>
            <Text style={styles.selected_vibration}>
              Vibration: {this.renderSelectedPattern()}
            </Text>
          </TouchableOpacity>
          <Switch
            trackColor={{ false: "#767577", true: "#314CB6" }}
            thumbColor={"white"}
            onValueChange={this.onChangeSwitch}
            value={this.state.vibration.enabled}
            style={styles.switch_container}
          />
        </View>
        <Modal isVisible={this.state.visible_patterns} style={styles.modal}>
          <Button title="Back" onPress={this.toggleVibrationPatterns} />
          <Switch
            trackColor={{ false: "#767577", true: "#314CB6" }}
            thumbColor={"white"}
            onValueChange={this.onChangeSwitch}
            value={this.state.vibration.enabled}
            style={styles.switch_container}
          />
          <View>
            {this.state.patterns.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={
                    this.state.vibration.enabled
                      ? styles.pattern_container
                      : styles.pattern_container_disabled
                  }
                  disabled={this.state.vibration.enabled ? false : true}
                  onPress={() => {
                    this.onPressPattern(item);
                  }}
                >
                  <View style={styles.circle}>
                    <View
                      style={
                        item.selected
                          ? styles.circle_selected
                          : styles.circle_normal
                      }
                    ></View>
                  </View>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  topContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  pattern_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  switch_container: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  modal: {
    backgroundColor: "white",
    margin: 0,
    padding: 20,
  },
  pattern_container_disabled: {
    opacity: 0.5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  circle_normal: {
    height: 12,
    width: 12,
  },
  circle_selected: {
    height: 12,
    width: 12,
    borderRadius: 20,
    backgroundColor: "#314CB6",
  },
  selected_vibration: {
    fontSize: 18,
  },
});

export default EditVibration;
