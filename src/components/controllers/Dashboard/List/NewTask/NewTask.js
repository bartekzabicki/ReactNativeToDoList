import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { NavigationActions } from "react-navigation";
import RoundedButton from "../../../../../common/components/RoundedButton";
import Validator from "../../../../../common/validators/TextInputValidator";
import ApiManager from "../../../../../common/networking/ApiManager";

export default class NewTask extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      token: "",
      title: "",
      content: "",
      latitude: 22.32,
      longitude: 22.33,
      isDateTimePickerVisible: false,
      isDatePicked: false,
      selectedDate: "Add date for your note",
      isNameValidated: true
    };
    this.newTaskRequest = this.newTaskRequest.bind(this);
  }

  async newTaskRequest() {
    let apiResult = await ApiManager.newTask(this.state);
    if (apiResult.success === true) {
      this.props.navigation.state.params.addNewtask();
      this.props.navigation.dispatch(NavigationActions.back());
    } else {
      Alert.alert(apiResult.errorMessage);
    }
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ isDatePicked: true });
    this.setState({ selectedDate: moment(date).format("YYYY-MM-DD hh:mm") });
    this._hideDateTimePicker();
  };

  _addPressed = () => {
    let result = Validator.newTaskValidation(this.state);
    if (result.isValidated == true) {
      this.newTaskRequest();
    } else {
      this.setState({ isNameValidated: false });
      Alert.alert(result.errorMessage);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grayContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Create a New Note</Text>
          </View>
          <View style={styles.inputsContainer}>
            <KeyboardAvoidingView behavior="padding" enabled>
              <TextInput
                style={styles.input}
                placeholder="Enter Note Name..."
                placeholderTextColor={this.state.isNameValidated ? null : "red"}
                returnKeyType="next"
                autoCorrect={false}
                onChangeText={value => this.setState({ title: value })}
                onSubmitEditing={() => this.contentInput.focus()}
              />
              <TextInput
                style={styles.inputMultiline}
                placeholder="Write your note..."
                returnKeyType="done"
                onChangeText={value => this.setState({ content: value })}
                autoCorrect={false}
                multiline={true}
                ref={input => (this.contentInput = input)}
              />
            </KeyboardAvoidingView>
          </View>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={this._showDateTimePicker}>
              <Text style={styles.headerText}>{this.state.selectedDate}</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            maximumDate={new Date()}
          />
          <View style={styles.addNoteView}>
            <RoundedButton title="Save note" onPress={this._addPressed} />
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
