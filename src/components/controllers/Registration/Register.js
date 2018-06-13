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
import RoundedButton from "../../../common/components/RoundedButton";
import Validator from "../../../common/validators/TextInputValidator";
import ApiManager from "../../../common/networking/ApiManager";

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
    let result = Validator.registerValidation(this.state);
    if (result.isValidated == true) { 
      this.setState({ loading: true });
      this._sendUser();
    } else {
      Alert.alert(result.errorMessage);
    }
  }

  _hideSpinnerWithText(text) {
    this.setState({ loading: false });
    setTimeout(() => {
      Alert.alert(text);
    }, 100);
  }

  async _sendUser() {
    let apiResult = await ApiManager.register(this.state);
    if (apiResult.success == true) {
      this._hideSpinnerWithText("Your account was created!");
      this.props.navigation.dispatch(NavigationActions.back());
    } else {
      this._hideSpinnerWithText(apiResult.errorMessage)
    }
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
        <RoundedButton
          title="Register"
          onPress={this._registerPressed.bind(this)}
        />
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
  datePickerText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 15
  }
});
