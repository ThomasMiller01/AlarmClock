import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Button,
} from "react-native";
import Modal from "react-native-modal";
import RingtoneManager from "react-native-ringtone-manager";
import ColorsManager from "../../../colors/colors";

const colorsManager = ColorsManager.get();

class EditSound extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.alarm = this.props.alarm;

    this.colors = colorsManager.colors();
    this.setStyles();
  }

  state = {
    sound: {
      enabled: true,
    },
    visible: false,
    ringtones: [
      { value: 1, selected: true },
      { value: 2, selected: false },
      { value: 3, selected: false },
    ],
  };

  componentDidMount() {
    // console.log("starting to get ringtones");
    // RingtoneManager.pickRingtone();
    // let ringtones = RingtoneManager.getRingtones(RingtoneManager.TYPE_ALL);
    // console.log("ringtonessss", ringtones);
    // console.log("got ringtones");
  }

  getSound = () => {
    return "not implemented";
  };

  renderSelectedSound = () => {
    if (this.state.sound.enabled) {
      let sound = this.state.ringtones.filter((p) => p.selected)[0];
      return sound.value;
    } else {
      return "Off";
    }
  };

  onChangeSwitch = () => {
    let sound = this.state.sound;
    sound.enabled = sound.enabled ? false : true;
    this.setState({ sound });
  };

  toggleVisibility = () => {
    let visible = this.state.visible;
    visible = visible ? false : true;
    this.setState({ visible });
  };

  onPressSound = (sound) => {
    let ringtones = this.state.ringtones;
    ringtones.forEach((r) => {
      r.selected = false;
    });
    let index = ringtones.indexOf(sound);
    ringtones[index].selected = true;
    this.setState({ ringtones });
  };

  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.topContainer}>
          <TouchableOpacity onPress={this.toggleVisibility}>
            <Text style={this.styles.selected_sound}>
              Sound: {this.renderSelectedSound()}
            </Text>
          </TouchableOpacity>
          <Switch
            trackColor={{
              false: this.colors.switch.off,
              true: this.colors.switch.on,
            }}
            thumbColor={this.colors.switch.thumb}
            onValueChange={this.onChangeSwitch}
            value={this.state.sound.enabled}
            style={this.styles.switch_container}
          />
        </View>
        <Modal isVisible={this.state.visible} style={this.styles.modal}>
          <Button title="Back" onPress={this.toggleVisibility} />
          <Switch
            trackColor={{
              false: this.colors.switch.off,
              true: this.colors.switch.on,
            }}
            thumbColor={this.colors.switch.thumb}
            onValueChange={this.onChangeSwitch}
            value={this.state.sound.enabled}
            style={this.styles.switch_container}
          />
          <View>
            {this.state.ringtones.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={
                    this.state.sound.enabled
                      ? this.styles.sound_container
                      : this.styles.sound_container_disabled
                  }
                  disabled={this.state.sound.enabled ? false : true}
                  onPress={() => {
                    this.onPressSound(item);
                  }}
                >
                  <View style={this.styles.circle}>
                    <View
                      style={
                        item.selected
                          ? this.styles.circle_selected
                          : this.styles.circle_normal
                      }
                    ></View>
                  </View>
                  <Text style={this.styles.text}>{item.value}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Modal>
      </View>
    );
  }

  setStyles = () => {
    this.styles = StyleSheet.create({
      container: {},
      topContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      },
      switch_container: {
        transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
      },
      modal: {
        backgroundColor: this.colors.background.second,
        margin: 0,
        padding: 20,
      },
      sound_container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      },
      sound_container_disabled: {
        opacity: 0.5,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      },
      circle: {
        height: 20,
        width: 20,
        borderRadius: 20 / 2,
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        backgroundColor: "transparent",
        borderColor: this.colors.circle.background,
      },
      circle_normal: {
        height: 12,
        width: 12,
      },
      circle_selected: {
        height: 12,
        width: 12,
        borderRadius: 20,
        backgroundColor: this.colors.circle.selected,
      },
      selected_sound: {
        fontSize: 18,
        color: this.colors.text.normal,
      },
      text: {
        color: this.colors.text.normal,
      },
    });
  };
}

export default EditSound;
