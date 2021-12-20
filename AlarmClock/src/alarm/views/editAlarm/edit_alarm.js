import React, { Component, createRef } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  Button,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import EditTime from "./edit_time";
import EditSound from "./edit_sound";
import EditVibration from "./edit_vibration";
import EditReminder from "./edit_reminder";

class EditAlarm extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    let params = props.route.params;

    this.alarm = params.alarm;

    this.state = {
      alarm_id: this.alarm.alarm_id,
      name: this.alarm.name,
    };

    this.nameRef = createRef();
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
    this.alarm.update(save_obj);
    this.showSaveToast();
  };

  showSaveToast = () => {
    Toast.show({
      type: "info",
      text1: "Alarm saved!",
      position: "bottom",
    });
  };

  onChangeName = (value) => {
    this.setState({ name: value });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <EditTime alarm={this.alarm} ref={this.timeRef} />
        <View style={styles.name_container}>
          <TextInput
            value={this.state.name}
            onChangeText={this.onChangeName}
            style={styles.textField}
          />
        </View>
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
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20,
  },
  name_container: {
    marginTop: 15,
    marginBottom: 15,
  },
});

export default EditAlarm;
