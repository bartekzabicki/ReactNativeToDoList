import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { NavigationActions } from 'react-navigation'
import RoundedButton from "../../../../../common/components/RoundedButton";

export default class EditTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      title: this.props.navigation.state.params.task.title,
      content: this.props.navigation.state.params.task.content,
      date: this.props.navigation.state.params.task.date,
      latitude: this.props.navigation.state.params.task.latitude,
      longitude: this.props.navigation.state.params.task.longitude,
    }
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ isDatePicked: true });
    this.setState({ date: moment(date).format("YYYY-MM-DD hh:mm") });
    this._hideDateTimePicker();
  };

  _changePressed = () => {
    var task = this.props.navigation.state.params.task
    task.title = this.state.title
    task.content = this.state.content
    task.date = this.state.date
    task.latitude = this.state.latitude
    task.longitude = this.state.longitude
    this.props.navigation.state.params.taskWasEditing(task)
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grayContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Edit your note</Text>
          </View>
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Note Name..."
              returnKeyType="next"
              autoCorrect={false}
              onChangeText={value => this.setState({ title: value })}
              defaultValue={this.state.title}
            />
            <TextInput
              style={styles.inputMultiline}
              placeholder="Write your note..."
              returnKeyType="done"
              onChangeText={value => this.setState({ content: value })}
              autoCorrect={false}
              multiline={true}
              defaultValue={this.state.content}
            />
          </View>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={this._showDateTimePicker}>
              <Text style={styles.headerText}>{moment(this.state.date).format("YYYY-MM-DD hh:mm")}</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            maximumDate={new Date()}
          />
          <View style={styles.addNoteView}>
            <RoundedButton title="Save changes" onPress={this._changePressed} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  grayContainer: {
    backgroundColor: "#D9D7D8",
    margin: 16,
    alignSelf: "stretch"
  },
  headerContainer: {
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 16
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500"
  },
  inputsContainer: {
    marginLeft: 8,
    marginRight: 8
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    color: "black",
    backgroundColor: "white"
  },
  inputMultiline: {
    minHeight: 150,
    maxHeight: 200,
    marginTop: 16,
    color: "black",
    backgroundColor: "white",
    padding: 8
  },
  datePickerText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 15
  },
  addNoteView: {
    alignItems: "center",
    marginBottom: 16
  }
});


