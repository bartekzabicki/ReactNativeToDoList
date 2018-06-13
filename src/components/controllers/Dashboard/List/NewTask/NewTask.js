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
    console.log("Test");
    var data = {
     title: this.state.title,
     content: this.state.content,
     latitude: this.state.latitude,
     longitude: this.state.longitude,
     date: this.state.selectedDate
    };

    const url = `http://213.32.87.132:3000/api/notes/add`;
    AsyncStorage.getItem("token").then((value) => {
      this.setState({ token: value });
    })
    .then(res => {
        console.log("Test2");
        fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "token": this.state.token
          },
          body: JSON.stringify(data)
        }).then(response => {
          response.json().then((responseJSON) => {
            if (response.status === 200) {
              console.log("Succ");
              // this.props.navigation.dispatch(NavigationActions.back())
            } else {
              Alert.alert(responseJSON.error)
            }
          }).catch((error) => {
            Alert.alert(error);
          });
        }).catch((error) => {
          Alert.alert(error);
        });
      }).catch((error) => {
        Alert.alert(error);
      });
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


