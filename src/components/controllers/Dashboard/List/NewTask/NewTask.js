import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity, 
  AsyncStorage
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { NavigationActions } from 'react-navigation';
import RoundedButton from "../../../../../common/components/RoundedButton";
import Validator from "../../../../../common/validators/TextInputValidator";
import ApiManager from "../../../../../common/networking/ApiManager";

export default class NewTask extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: "",
      title: "",
      content: "",
      latitude: 22.32,
      longitude: 22.33,
      isDateTimePickerVisible: false,
      isDatePicked: false,
      selectedDate: "Select date",
    };
    this.newTaskRequest = this.newTaskRequest.bind(this)
  }

  async newTaskRequest() {
    ApiManager.newTask(this.state).then((response) => {
      console.log(response)
      console.log(this.props)
      this.props.refreshCallback().bind(this)
    })
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ isDatePicked: true });
    this.setState({ selectedDate: moment(date).format("YYYY-MM-DD hh:mm") });
    this._hideDateTimePicker();
  };

  _addPressed = () => {
    let result = Validator.newTaskValidation(this.state)
    if (result.isValidated == true) {
      this.newTaskRequest()
    } else {
      Alert.alert(result.errorMessage)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            returnKeyType="next"
            onChangeText={value => this.setState({ title: value })}
          />
          <TextInput
            style={styles.inputMultiline}
            placeholder="Description"
            returnKeyType="next"
            onChangeText={value => this.setState({ content: value })}
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
        <RoundedButton title="Add note" onPress={this._addPressed} />
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
  datePickerText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 15
  }
});


