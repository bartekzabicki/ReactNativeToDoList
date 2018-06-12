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
import { NavigationActions } from "react-navigation";

import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import Loader from "../../../Loader/Loader";
import { REGISTER_URL } from "../../../constants/Constants";
import RoundedButton from "../../../common/components/RoundedButton"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      isDateTimePickerVisible: false,
      selectedDate: "Select birthday date",
      isDatePicked: false,
      loading: false
    };
  }

  _registerPressed() {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.trim() == "") {
      Alert.alert("Enter email");
    } else if (this.state.password.trim() == "") {
      Alert.alert("Enter password");
    } else if (this.state.confirmPassword.trim() == "") {
      Alert.alert("Confirm password");
    } else if (this.state.isDatePicked == false) {
      Alert.alert("Choose birthday date");
    } else if (this.state.password != this.state.confirmPassword) {
      Alert.alert("Passwords are different");
    } else if (emailRegex.test(this.state.email) === false) {
      Alert.alert("Email is Not Correct");
    } else {
      this.setState({ loading: true });
      this._sendUser();
    }
  }

  _hideSpinnerWithText(text) {
    this.setState({ loading: false });
    setTimeout(() => {
      Alert.alert(text);
    }, 100);
  }

  async _sendUser() {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        date: this.state.selectedDate
      })
    }).catch(error => {
      this._hideSpinnerWithText(error);
    });
    if (response.status === 200) {
      this.setState({ loading: false });
      this._hideSpinnerWithText("Your account was created!");
      this.props.navigation.dispatch(NavigationActions.back());
      return;
    }
    const responseJSON = await response.json();
    this._hideSpinnerWithText(responseJSON.error);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ isDatePicked: true });
    this.setState({ selectedDate: moment(date).format("YYYY-MM-DD") });
    this._hideDateTimePicker();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Loader loading={this.state.loading} />
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
            autoCapitalize="none"
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
            <Text style={styles.datePickerText}>{this.state.selectedDate}</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            maximumDate={new Date()}
          />
        </View>
        <RoundedButton title="Register" onPress={this._registerPressed.bind(this)} />
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
  },
  datePickerText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 15
  }
});
