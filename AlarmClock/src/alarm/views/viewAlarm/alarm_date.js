import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { formatDate } from "../../utils";

class AlarmDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_date: props.date.is_date,
      date: props.date.value,
    };
  }

  state = {
    date: null,
  };

  render() {
    let _date = new Date(this.state.date);

    if (this.state.is_date) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{formatDate(_date, "dd.mm.yyyy")}</Text>
        </View>
      );
    } else {
      let data = this.state.date.map((elem) => elem.substring(0, 2));

      return (
        <View style={styles.container}>
          <Text style={styles.text}>{data.join(", ")}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
  },
  text: {
    fontSize: 15,
  },
});

export default AlarmDate;
