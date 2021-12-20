import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import AlarmName from "./alarm_name";
import AlarmDate from "./alarm_date";
import AlarmTime from "./alarm_time";
import AlarmOptions from "./alarm_options";
import AlarmUntil from "./alarm_until";
import AlarmState from "./alarm_state";

class AlarmViewer extends Component {
  constructor(props) {
    super(props);

    this.index = props.index;
    this.getAlarm = props.getAlarm;
    this.view = props.view;
    this.remove = props.remove;
    this.changeState = props.changeState;
  }

  state = {
    options: {
      show: false,
    },
  };

  viewAlarm = () => {
    this.view(this.index);
  };

  showOptions = () => {
    let show = this.state.options.show;
    show = show ? false : true;
    this.setState({
      options: {
        show,
      },
    });
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={this.viewAlarm}
        onLongPress={this.showOptions}
      >
        <View style={styles.topContainer}>
          <React.Fragment>
            <View style={styles.information}>
              <View style={styles.row}>
                <AlarmTime getAlarm={this.getAlarm} index={this.index} />
                <AlarmName getAlarm={this.getAlarm} index={this.index} />
              </View>
              <View style={styles.row}>
                <AlarmDate getAlarm={this.getAlarm} index={this.index} />
                <Text>|</Text>
                <AlarmUntil getAlarm={this.getAlarm} index={this.index} />
              </View>
            </View>
            <View style={styles.state}>{this.getOptionsState()}</View>
          </React.Fragment>
        </View>
      </TouchableOpacity>
    );
  }

  getOptionsState = () => {
    if (this.state.options.show) {
      return <AlarmOptions index={this.index} remove={this.remove} />;
    } else {
      return (
        <AlarmState
          index={this.index}
          getAlarm={this.getAlarm}
          changeState={this.changeState}
        />
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
  },
  topContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  information: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  state: {
    width: "20%",
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
