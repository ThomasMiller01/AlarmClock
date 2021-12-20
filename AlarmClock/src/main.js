import React, { Component } from "react";
import { StyleSheet, View, Button, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Alarm from "./alarm/alarm";
import AlarmViewer from "./alarm/views/viewAlarm/alarm_viewer";
import { dummyValues, divider } from "./alarm/utils";

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
    this.willFocusSubscription = this.props.navigation.addListener(
      "focus",
      async () => {
        await this.getAlarms();
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }

  getAlarms = async () => {
    console.log("get alarms");
    let keys = await AsyncStorage.getAllKeys();
    let alarms = keys.filter((key) => key.includes("alarm#"));
    alarms.sort(
      (a1, a2) => parseInt(a1.split("#")[1]) - parseInt(a2.split("#")[1])
    );
    let alarm_list = [];
    let alarm_items = await AsyncStorage.multiGet(alarms);
    alarm_items.forEach(async (item) => {
      let alarm_json = JSON.parse(item[1]);
      console.log("name", alarm_json["name"]);
      alarm_list.push(
        new Alarm(
          alarm_json["name"],
          alarm_json["time"],
          alarm_json["sound"],
          alarm_json["vibration"],
          alarm_json["reminder"],
          alarm_json["active"],
          alarm_json["alarm_id"]
        )
      );
    });
    this.setState({ alarm_list });
  };

  addAlarm = () => {
    let alarm_list = this.state.alarm_list;

    let data = dummyValues();

    alarm_list.push(
      new Alarm(
        data.name,
        data.time,
        data.sound,
        data.vibration,
        data.reminder,
        data.active
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

  changeState = (index, active) => {
    let alarm_list = this.state.alarm_list;
    alarm_list[index].update({ active });
    this.setState({ alarm_list });
  };

  getActive = (index) => {
    if (this.state.alarm_list[index]) {
      return this.state.alarm_list[index].active;
    }
    return false;
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.alarm_list.map((item, index) => (
            <React.Fragment key={index}>
              <AlarmViewer
                alarm={item}
                index={index}
                view={this.viewAlarm}
                remove={this.removeAlarm}
                changeState={this.changeState}
                getActive={this.getActive}
              />
              {divider()}
            </React.Fragment>
          ))}
          <Button title="Add" onPress={() => this.addAlarm()} />
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
