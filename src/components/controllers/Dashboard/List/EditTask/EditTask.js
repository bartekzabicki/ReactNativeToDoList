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

export default class EditTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      selectedDate: this.props.navigation.state.params.task.date,
    }
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ isDatePicked: true });
    this.setState({ selectedDate: moment(date).format("YYYY-MM-DD hh:mm") });
    this._hideDateTimePicker();
  };

  _changePressed = () => {
    this.props.refreshCallback()
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            defaultValue={this.props.navigation.state.params.task.title}
            placeholder="Title"
            returnKeyType="next"
            onSubmitEditing={() => this.newDescription.focus()}
          />
          <TextInput
            style={styles.inputMultiline}
            defaultValue={this.props.navigation.state.params.task.content}
            placeholder="Description"
            returnKeyType="next"
            ref={input => (this.newDescription = input)}
            multiline={true}
          />
          <TouchableOpacity onPress={this._showDateTimePicker}>
            <Text style={styles.datePickerText} >{this.state.selectedDate}</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            maximumDate={new Date()}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.customButton}
            onPress={this._changePressed}
          >
            <Text style={styles.customButtonText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  inputContainer: {
    width: "100%",
    marginTop: 24,
    marginBottom: 24
  },
  input: {
    height: 40,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    paddingHorizontal: 10,
    color: "black",
    borderColor: "#34495e",
    borderWidth: 0.5,
    borderRadius: 10
  },
  inputMultiline: {
    minHeight: 40,
    maxHeight: 200,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    paddingHorizontal: 10,
    color: "black",
    borderColor: "#34495e",
    borderWidth: 0.5,
    borderRadius: 10
  },
  customButton: {
    height: 40,
    backgroundColor: "#34495e",
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    justifyContent: "center",
    borderRadius: 10,
    width: 200
  },
  customButtonText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    color: "white"
  },
  datePickerText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 15
  }
});


