import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../../utils";

class EditTime extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.alarm = this.props.alarm;
    let value = this.alarm.time.selected.value;
    let selected_value = null;

    if (this.alarm.time.selected.is_date) {
      selected_value = new Date(value);
    } else {
      selected_value = [];
      value.forEach((date) => {
        let index = this.state.days.findIndex((elem) => elem.name == date);
        this.state.days[index].selected = true;
        selected_value.push(this.state.days[index]);
      });
    }

    this.state.time.value = new Date(this.alarm.time.time);
    this.state.selected = {
      is_date: this.alarm.time.selected.is_date,
      value: selected_value,
    };
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
        name: "Monday",
        short: "Mon",
        minimal: "M",
        selected: false,
      },
      {
        name: "Tuesday",
        short: "Tue",
        minimal: "T",
        selected: false,
      },
      {
        name: "Wednesday",
        short: "Wed",
        minimal: "W",
        selected: false,
      },
      {
        name: "Thursday",
        short: "Thu",
        minimal: "T",
        selected: false,
      },
      {
        name: "Friday",
        short: "Fri",
        minimal: "F",
        selected: false,
      },
      {
        name: "Saturday",
        short: "Sat",
        minimal: "S",
        selected: false,
      },
      {
        name: "Sunday",
        short: "Sun",
        minimal: "S",
        selected: false,
      },
    ],
  };

  getTime = () => {
    let time = this.state.time.value;
    let selected = {
      is_date: this.state.selected.is_date,
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
      return (
        <Text style={styles.selected_date_text}>
          {formatDate(selected.value, "EEE, dd. mmm.")}
        </Text>
      );
    } else {
      let days = [];
      selected.value.forEach((day) => {
        days.push(day.short);
      });
      return (
        <Text style={styles.selected_date_text}>Every {days.join(", ")}</Text>
      );
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
        <TouchableOpacity onPress={this.showTime} style={styles.time}>
          <View>
            <Text style={styles.time_text}>
              {formatDate(this.state.time.value, "hh:MM")}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.selected_date}>
          <View style={styles.moment}>
            <Text>{this.renderSelectedDay()}</Text>
          </View>
          <Button title="Set date" onPress={this.showDate} />
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
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  selected_date: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  selected_date_text: {
    fontSize: 18,
  },
  days_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 0,
    justifyContent: "space-between",
    height: 25,
  },
  days_text: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
  },
  day_normal: {
    width: "12%",
    height: "100%",
    aspectRatio: 1,
  },
  day_selected: {
    backgroundColor: "lightblue",
    width: "12%",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: 50,
  },
  time: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  time_text: {
    fontSize: 80,
  },
  moment: {
    marginRight: 20,
  },
});

export default EditTime;
