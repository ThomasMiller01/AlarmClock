import AsyncStorage from "@react-native-async-storage/async-storage";

import { weekdayToNumber } from "./utils";

class Alarm {
  constructor(name, time, sound, vibration, reminder, active, exists) {
    this.name = name;
    this.time = time;
    this.sound = sound;
    this.vibration = vibration;
    this.reminder = reminder;
    this.active = active;
    this.alarm_id = exists !== undefined ? exists : null;

    if (exists === undefined) {
      this.add();
    }
  }

  async remove() {
    await AsyncStorage.removeItem("alarm#" + this.alarm_id);
  }

  async update(save_obj) {
    this.updateData(save_obj);

    await AsyncStorage.setItem(
      "alarm#" + this.alarm_id,
      JSON.stringify({
        name: this.name,
        time: this.time,
        sound: this.sound,
        vibration: this.vibration,
        reminder: this.reminder,
        active: this.active,
        alarm_id: this.alarm_id,
      })
    );
  }

  updateData(save_obj) {
    if (save_obj.hasOwnProperty("name")) {
      this.name = save_obj.name;
    }
    if (save_obj.hasOwnProperty("time")) {
      this.time = save_obj.time;
    }
    if (save_obj.hasOwnProperty("sound")) {
      this.sound = save_obj.sound;
    }
    if (save_obj.hasOwnProperty("vibration")) {
      this.vibration = save_obj.vibration;
    }
    if (save_obj.hasOwnProperty("reminder")) {
      this.reminder = save_obj.reminder;
    }
    if (save_obj.hasOwnProperty("active")) {
      this.active = save_obj.active;
    }
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
          active: this.active,
          alarm_id: this.alarm_id,
        })
      );
    }
  }

  getUntil = () => {
    let until = {
      date: this.time.selected,
      time: this.time.time,
    };

    let time = new Date(until.time);
    time.setMilliseconds(0);
    time.setSeconds(0);
    time.setFullYear(2000, 2, 2);
    if (until.date.is_date) {
      let date = new Date(until.date.value);
      date.setMilliseconds(0);
      date.setSeconds(0);
      date.setMinutes(time.getMinutes());
      date.setHours(time.getHours());
      return date;
    }

    let day = this.parseWeekdays(until.date.value, time);
    return day;
  };

  parseWeekdays = (weekdays, time) => {
    let days = [];
    weekdays.forEach((weekday) => {
      let current = new Date();
      let current_day = current.getDay();
      current.setMilliseconds(0);
      current.setSeconds(0);
      current.setFullYear(2000, 2, 2);

      if (weekdayToNumber(weekday) == current_day && time > current) {
        let now = new Date();
        now.setMinutes(time.getMinutes());
        now.setHours(time.getHours());
        days.push(now);
      } else {
        days.push(this.getNextWeekDay(weekday, time));
      }
    });

    let day = Math.min.apply(null, days);
    return day;
  };

  getNextWeekDay = (day, time) => {
    let add = weekdayToNumber(day);

    let date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(time.getMinutes());
    date.setHours(time.getHours());
    let mdate = date.getDate() + ((7 + add - date.getDay() - 1) % 7) + 1;
    date.setDate(mdate);

    return date;
  };
}

export default Alarm;
