import React, { Component } from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Alarm from "./alarm/alarm";
import AlarmViewer from "./alarm/views/alarm_viewer";

class Main extends Component {
  constructor(props) {
    super(props);

    this.viewAlarm = this.viewAlarm.bind(this);
    this.removeAlarm = this.removeAlarm.bind(this);
  }

  state = {
    alarm_list: [],
    updated: false,
  };

  componentDidMount() {
    this.getAlarms();
  }

  // componentDidUpdate() {
  //   console.log("update");
  //   this.getAlarms();
  // }

  getAlarms = async () => {
    console.log("getAlarms");
    let keys = await AsyncStorage.getAllKeys();
    let alarms = keys.filter((key) => key.includes("alarm#"));
    alarms.sort(
      (a1, a2) => parseInt(a1.split("#")[1]) - parseInt(a2.split("#")[1])
    );
    let alarm_list = [];
    let alarm_items = await AsyncStorage.multiGet(alarms);
    alarm_items.forEach(async (item) => {
      let alarm_json = JSON.parse(item[1]);
      alarm_list.push(
        new Alarm(
          alarm_json["name"],
          alarm_json["time"],
          alarm_json["sound"],
          alarm_json["vibration"],
          alarm_json["reminder"],
          alarm_json["alarm_id"]
        )
      );
    });
    this.setState({ alarm_list });
  };

  addAlarm = () => {
    let alarm_list = this.state.alarm_list;
    alarm_list.push(
      new Alarm(
        "__name__",
        "__time__",
        "__sound__",
        "__vibration__",
        "__reminder__"
      )
    );
    this.setState({ alarm_list });
  };

  removeAlarm = (index) => {
    let alarm_list = this.state.alarm_list;
    let alarm = alarm_list[index];
    alarm.remove();
    alarm_list.splice(index, 1);
    this.setState({ alarm_list });
  };

  viewAlarm = (index) => {
    let alarm_list = this.state.alarm_list;
    let alarm = alarm_list[index];
    this.props.navigation.navigate("Alarm", { alarm });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Add" onPress={() => this.addAlarm()} />
        <ScrollView>
          <Text>Alarms:</Text>
          {this.state.alarm_list.map((item, index) => (
            <AlarmViewer
              name={item.name}
              time={item.time}
              index={index}
              view={this.viewAlarm}
              remove={this.removeAlarm}
              key={index}
            />
          ))}
        </ScrollView>
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
    padding: 5,
  },
});

export default Main;
