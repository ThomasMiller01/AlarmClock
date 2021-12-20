import React, { Component } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import ColorsManager from "../../../colors/colors";

const colorsManager = ColorsManager.get();

class AlarmState extends Component {
  constructor(props) {
    super(props);

    this.index = props.index;
    this.getAlarm = props.getAlarm;
    this.changeState = props.changeState;

    let alarm = this.getAlarm(this.index);
    this.state = { active: alarm.active };

    this.colors = colorsManager.colors();
    this.setStyles();
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
      <View style={this.styles.container}>
        <Switch
          trackColor={{
            false: this.colors.switch.off,
            true: this.colors.switch.on,
          }}
          thumbColor={this.colors.switch.thumb}
          onValueChange={this.onChangeSwitch}
          value={this.state.active}
          style={this.styles.switch_container}
        />
      </View>
    );
  }

  setStyles = () => {
    this.styles = StyleSheet.create({
      container: {},
      switch_container: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
      },
    });
  };
}

export default AlarmState;
