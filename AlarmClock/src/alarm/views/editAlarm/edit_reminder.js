import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Button,
} from "react-native";
import Modal from "react-native-modal";

class EditReminder extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.alarm = this.props.alarm;

    this.state.reminder.enabled = this.alarm.reminder.enabled;
    let intervallIndex = this.state.intervalls.findIndex(
      (elem) => elem.value == this.alarm.reminder.intervall.value
    );
    this.state.intervalls[intervallIndex].selected = true;
    let repeatIndex = this.state.repeat.findIndex(
      (elem) => elem.value == this.alarm.reminder.repeat.value
    );
    this.state.repeat[repeatIndex].selected = true;
  }

  state = {
    reminder: {
      enabled: true,
    },
    visible: false,
    intervalls: [
      { name: "5 minutes", value: 5, selected: false },
      { name: "10 minutes", value: 10, selected: false },
      { name: "15 minutes", value: 15, selected: false },
      { name: "30 minutes", value: 30, selected: false },
    ],
    repeat: [
      { name: "3 times", value: 3, selected: false },
      { name: "5 times", value: 5, selected: false },
      { name: "Infinite", value: -1, selected: false },
    ],
  };

  getReminder = () => {
    let enabled = this.state.reminder.enabled;
    let intervall = this.state.intervalls.filter((p) => p.selected)[0];
    let minified_intervall = { value: intervall.value };
    let repeat = this.state.repeat.filter((p) => p.selected)[0];
    let minified_repeat = { value: repeat.value };
    return { enabled, intervall: minified_intervall, repeat: minified_repeat };
  };

  renderSelectedReminder = () => {
    if (this.state.reminder.enabled) {
      let intervall = this.state.intervalls.filter((p) => p.selected)[0];
      let repeat = this.state.repeat.filter((p) => p.selected)[0];
      return intervall.name + ", " + repeat.name;
    } else {
      return "Off";
    }
  };

  toggleVisibility = () => {
    let visible = this.state.visible;
    visible = visible ? false : true;
    this.setState({ visible });
  };

  onChangeSwitch = () => {
    let reminder = this.state.reminder;
    reminder.enabled = reminder.enabled ? false : true;
    this.setState({ reminder });
  };

  onPressIntervalls = (intervall) => {
    let intervalls = this.state.intervalls;
    intervalls.forEach((i) => {
      i.selected = false;
    });
    let index = intervalls.indexOf(intervall);
    intervalls[index].selected = true;
    this.setState({ intervalls });
  };

  onPressRepeat = (_r) => {
    let repeat = this.state.repeat;
    repeat.forEach((r) => {
      r.selected = false;
    });
    let index = repeat.indexOf(_r);
    repeat[index].selected = true;
    this.setState({ repeat });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={this.toggleVisibility}>
            <Text style={styles.selected_reminder}>
              Reminder: {this.renderSelectedReminder()}
            </Text>
          </TouchableOpacity>
          <Switch
            trackColor={{ false: "#767577", true: "#314CB6" }}
            thumbColor={"white"}
            onValueChange={this.onChangeSwitch}
            value={this.state.reminder.enabled}
            style={styles.switch_container}
          />
        </View>
        <Modal isVisible={this.state.visible} style={styles.modal}>
          <Button title="Back" onPress={this.toggleVisibility} />
          <Switch
            trackColor={{ false: "#767577", true: "#314CB6" }}
            thumbColor={"white"}
            onValueChange={this.onChangeSwitch}
            value={this.state.reminder.enabled}
            style={styles.switch_container}
          />
          <View>
            <Text>Interval</Text>
            {this.state.intervalls.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={
                    this.state.reminder.enabled
                      ? styles.reminder_container
                      : styles.reminder_container_disabled
                  }
                  disabled={this.state.reminder.enabled ? false : true}
                  onPress={() => {
                    this.onPressIntervalls(item);
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
          <View>
            <Text>Repeat</Text>
            {this.state.repeat.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={
                    this.state.reminder.enabled
                      ? styles.reminder_container
                      : styles.reminder_container_disabled
                  }
                  disabled={this.state.reminder.enabled ? false : true}
                  onPress={() => {
                    this.onPressRepeat(item);
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
  switch_container: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  modal: {
    backgroundColor: "white",
    margin: 0,
    padding: 20,
  },
  reminder_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  reminder_container_disabled: {
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
  selected_reminder: {
    fontSize: 18,
  },
});

export default EditReminder;
