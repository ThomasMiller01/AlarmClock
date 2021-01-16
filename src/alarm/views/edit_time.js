import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

class EditTime extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.alarm = this.props.alarm;

    this.state.time.value = new Date();

    this.state.date = { is_date: true, value: new Date() };
  }

  state = {
    time: {
      value: new Date(),
      show: false,
    },
    date: {
      value: new Date(),
      show: false,
    },
    selected: {
      is_date: true,
      value: new Date(),
    },
    days: [
      {
        name: "Montag",
        short: "Mo",
        minimal: "M",
        selected: false,
      },
      {
        name: "Dienstag",
        short: "Di",
        minimal: "D",
        selected: false,
      },
      {
        name: "Mittwoch",
        short: "Mi",
        minimal: "M",
        selected: false,
      },
      {
        name: "Donnerstag",
        short: "Do",
        minimal: "D",
        selected: false,
      },
      {
        name: "Freitag",
        short: "Fr",
        minimal: "F",
        selected: false,
      },
      {
        name: "Samstag",
        short: "Sa",
        minimal: "S",
        selected: false,
      },
      {
        name: "Sonntag",
        short: "So",
        minimal: "S",
        selected: false,
      },
    ],
  };

  getTime = () => {
    let time = this.state.time.value;
    let selected = {
      is_date: this.state.date.is_date,
      value: null,
    };
    if (selected.is_date) {
      selected.value = this.state.selected.value;
    } else {
      let value = [];
      this.state.selected.value.forEach((day) => {
        value.push(day.name);
      });
      selected.value = value;
    }
    return {
      time,
      selected,
    };
  };

  onChangeDay = (index) => {
    let days = this.state.days;
    if (days[index].selected) {
      days[index].selected = false;
    } else {
      days[index].selected = true;
    }
    let active_days = days.filter((elem) => elem.selected);
    let selected = this.state.selected;
    if (active_days.length !== 0) {
      selected.is_date = false;
      selected.value = active_days;
    } else {
      selected.is_date = true;
      selected.value = this.state.date.value;
    }
    this.setState({ days, selected });
  };

  renderDay = (day, index) => {
    if (day.selected) {
      return (
        <TouchableOpacity
          style={styles.day_selected}
          onPress={() => this.onChangeDay(index)}
        >
          <Text style={styles.days_text}>{day.short}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.day_normal}
          onPress={() => this.onChangeDay(index)}
        >
          <Text style={styles.days_text}>{day.minimal}</Text>
        </TouchableOpacity>
      );
    }
  };

  renderSelectedDay = () => {
    let selected = this.state.selected;
    if (selected.is_date) {
      return <Text>{formatDate(selected.value, "EEE, dd. mmm.")}</Text>;
    } else {
      let days = [];
      selected.value.forEach((day) => {
        days.push(day.short);
      });
      return <Text>{"Jeden " + days.join(", ")}</Text>;
    }
  };

  onChangeTime = (event, value) => {
    let time = this.state.time;
    if (value) {
      time.value = value;
    }
    time.show = false;
    this.setState({ time });
  };

  showTime = () => {
    let time = this.state.time;
    time.show = true;
    this.setState({ time });
  };

  showDate = () => {
    let date = this.state.date;
    date.show = true;
    this.setState({ date });
  };

  onChangeDate = (event, value) => {
    let date = this.state.date;
    let selected = this.state.selected;
    let days = this.state.days;
    if (value) {
      date.value = value;
      selected.value = value;
      selected.is_date = true;
      days.forEach((day) => {
        day.selected = false;
      });
    }
    date.show = false;
    this.setState({ date, selected, days });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.time.show && (
          <DateTimePicker
            value={this.state.time.value}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={this.onChangeTime}
          />
        )}
        {this.state.date.show && (
          <DateTimePicker
            value={this.state.date.value}
            mode={"date"}
            display="default"
            onChange={this.onChangeDate}
          />
        )}
        <Button
          title={formatDate(this.state.time.value, "hh:MM")}
          onPress={this.showTime}
        />
        <View style={styles.selected_date}>
          <Text>{this.renderSelectedDay()}</Text>
          <Button title="Date" onPress={this.showDate} />
        </View>
        <View style={styles.days_container}>
          {this.state.days.map((day, index) => (
            <React.Fragment key={index}>
              {this.renderDay(day, index)}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  selected_date: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  days_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#ffff",
    borderWidth: 0.5,
    borderRadius: 2,
    justifyContent: "space-between",
    height: 25,
  },
  days_text: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
  },
  day_normal: {
    width: "12%",
    height: "100%",
  },
  day_selected: {
    backgroundColor: "lightblue",
    width: "12%",
  },
});

const formatDate = (date, format) => {
  let week_days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  let months = [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ];
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  let h = date.getHours();
  let M = date.getMinutes();
  let s = date.getSeconds();
  let mname = months[m - 1];
  let dname = week_days[date.getDay()];
  format = format.replace("EEE", dname);
  format = format.replace("dd", d < 10 ? "0" + d : d);
  format = format.replace("mmm", mname);
  format = format.replace("mm", m < 10 ? "0" + m : m);
  format = format.replace("yyyy", y);
  format = format.replace("hh", h < 10 ? "0" + h : h);
  format = format.replace("MM", M < 10 ? "0" + M : M);
  format = format.replace("ss", s < 10 ? "0" + s : s);
  return format;
};

export default EditTime;
