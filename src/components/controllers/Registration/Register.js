import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

class Register extends Component {

  state = {
    email: "",
    password: "",
    confirmPassword: "",
    isDateTimePickerVisible: false,
    selectedDate: ""
  };

  _registerPressed = () => {
    Alert.alert(this.state.email);
    console.log("A date has been picked: ", this.state.selectedDate);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ selectedDate: moment(date).format("MMM Do YYYY") });
    this._hideDateTimePicker();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Create account and have fun!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={value => this.setState({ email: value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry
            returnKeyType="next"
            ref={input => (this.passwordInput = input)}
            onSubmitEditing={() => this.confirmPasswordInput.focus()}
            onChangeText={value => this.setState({ password: value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            returnKeyType="done"
            ref={input => (this.confirmPasswordInput = input)}
            onChangeText={value => this.setState({ confirmPassword: value })}
          />
          <TouchableOpacity onPress={this._showDateTimePicker}>
            <Text>Show DatePicker</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            format={"YYYY-MM-DD"}
            maximumDate={new Date()}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.customButton}
            onPress={this._registerPressed}
          >
            <Text style={styles.customButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  headerView: {
    marginTop: 24,
    width: 160
  },
  headerText: {
    textAlign: "center",
    fontSize: 15
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
  buttonContainer: {
    flex: 2,
    alignItems: "center"
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
  }
});
