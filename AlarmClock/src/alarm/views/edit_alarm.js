import React, { Component, createRef } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  Button,
  TextInput,
  View,
} from "react-native";

import EditTime from "./edit_time";
import EditSound from "./edit_sound";
import EditVibration from "./edit_vibration";
import EditReminder from "./edit_reminder";

class EditAlarm extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    let params = props.navigation.state.params;

    this.alarm = params.alarm;

    this.state = {
      alarm_id: this.alarm.alarm_id,
      name: this.alarm.name,
    };

    this.timeRef = createRef();
    this.soundRef = createRef();
    this.vibrationRef = createRef();
    this.reminderRef = createRef();
  }

  state = {
    alarm_id: null,
    name: null,
  };

  save = () => {
    let alarm_id = this.state.alarm_id;
    let name = this.state.name;
    let time = this.timeRef.current.getTime();
    let sound = this.soundRef.current.getSound();
    let vibration = this.vibrationRef.current.getVibration();
    let reminder = this.reminderRef.current.getReminder();
    let save_obj = {
      alarm_id,
      name,
      time,
      sound,
      vibration,
      reminder,
    };
    console.log("save", save_obj);
  };

  onChangeName = (value) => {
    this.setState({ name: value });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ margin: 10 }}>
          <Text>alarm_id: {this.state.alarm_id}</Text>
        </View>
        <EditTime alarm={this.alarm} ref={this.timeRef} />
        <TextInput
          value={this.state.name}
          onChangeText={this.onChangeName}
          style={styles.textField}
        />
        <EditSound alarm={this.alarm} ref={this.soundRef} />
        <EditVibration alarm={this.alarm} ref={this.vibrationRef} />
        <EditReminder alarm={this.alarm} ref={this.reminderRef} />
        <Button title="Save" onPress={this.save} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    padding: 10,
    margin: 10,
  },
  textField: {
    width: "100%",
    borderBottomWidth: 0.2,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default EditAlarm;
