import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import AlarmName from "./alarm_name";
import AlarmDate from "./alarm_date";
import AlarmTime from "./alarm_time";
import AlarmOptions from "./alarm_options";
import AlarmUntil from "./alarm_until";
import AlarmState from "./alarm_state";

class AlarmViewer extends Component {
  constructor(props) {
    super(props);

    this.alarm = props.alarm;
    this.index = props.index;
    this.view = props.view;
    this.remove = props.remove;
    this.changeState = props.changeState;
    this.getActive = props.getActive;

    this.state = {
      alarm_id: this.alarm.alarm_id,
      name: this.alarm.name,
      date: this.alarm.time.selected,
      time: new Date(this.alarm.time.time),
      active: this.alarm.active,
    };
  }

  state = {
    alarm_id: null,
    name: null,
    date: null,
    time: null,
    active: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.information}>
            <View style={styles.row}>
              <AlarmTime time={this.state.time} />
              <AlarmName index={this.index} name={this.state.name} />
            </View>
            <View style={styles.row}>
              <AlarmDate date={this.state.date} />
              <Text>|</Text>
              <AlarmUntil
                until={{ date: this.state.date, time: this.state.time }}
                index={this.index}
                getActive={this.getActive}
              />
            </View>
          </View>
          <View style={styles.state}>
            <AlarmState
              index={this.index}
              active={this.state.active}
              changeState={this.changeState}
            />
          </View>
        </View>
        <AlarmOptions
          index={this.index}
          view={this.view}
          remove={this.remove}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    margin: 10,
  },
  topContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  information: {
    width: "75%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  state: {
    width: "25%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
});

export default AlarmViewer;
