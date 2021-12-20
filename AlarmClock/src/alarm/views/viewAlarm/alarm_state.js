import React, { Component } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";

class AlarmState extends Component {
  constructor(props) {
    super(props);

    this.index = props.index;
    this.getAlarm = props.getAlarm;
    this.changeState = props.changeState;

    let alarm = this.getAlarm(this.index);
    this.state = { active: alarm.active };
  }

  state = {
    active: true,
  };

  onChangeSwitch = () => {
    let active = this.state.active;
    active = active ? false : true;

    this.changeState(this.index, active);

    this.setState({ active });
  };

  render() {
    return (
      <View style={styles.container}>
        <Switch
          trackColor={{ false: "#767577", true: "#314CB6" }}
          thumbColor={"white"}
          onValueChange={this.onChangeSwitch}
          value={this.state.active}
          style={styles.switch_container}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  switch_container: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

export default AlarmState;
