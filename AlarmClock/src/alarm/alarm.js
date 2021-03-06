import AsyncStorage from "@react-native-async-storage/async-storage";

class Alarm {
  constructor(name, time, sound, vibration, reminder, exists) {
    this.name = name;
    this.time = time;
    this.sound = sound;
    this.vibration = vibration;
    this.reminder = reminder;
    this.alarm_id = exists !== undefined ? exists : null;

    if (exists === undefined) {
      this.add();
    }
  }

  async remove() {
    await AsyncStorage.removeItem("alarm#" + this.alarm_id);
  }

  async add() {
    if (this.time) {
      // get keys from asyncstorage
      let keys = await AsyncStorage.getAllKeys();
      // filter keys to get only alarms
      let alarms = keys.filter((key) => key.includes("alarm#"));
      // sort alarms to get last alarm at the end of the array
      alarms.sort(
        (a1, a2) => parseInt(a1.split("#")[1]) - parseInt(a2.split("#")[1])
      );
      // construct new alarm_id
      let new_alarm_id =
        alarms.length !== 0
          ? parseInt(alarms.slice(-1)[0].split("alarm#")[1]) + 1
          : 1;
      this.alarm_id = new_alarm_id.toString();
      // set new alarm in asyncstorage
      await AsyncStorage.setItem(
        "alarm#" + new_alarm_id.toString(),
        JSON.stringify({
          name: this.name,
          time: this.time,
          sound: this.sound,
          vibration: this.vibration,
          reminder: this.reminder,
          alarm_id: this.alarm_id,
        })
      );
    }
  }
}

export default Alarm;
