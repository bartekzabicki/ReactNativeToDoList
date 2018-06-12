import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

import RoundedButton from "../../../../common/components/RoundedButton"

class ChangeEmail extends Component {
  state = {
    email: "",
    password: ""
  };

  _changeEmailPressed = () => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.trim() == "") {
      Alert.alert("Enter email");
    } else if (this.state.password.trim() == "") {
      Alert.alert("Enter password");
    } else {
      if (emailRegex.test(this.state.email) === false) {
        Alert.alert("Email is Not Correct");
      } else {
        Alert.alert("Send to API")
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New email address"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={value => this.setState({ email: value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry
            returnKeyType="done"
            ref={input => (this.passwordInput = input)}
            onChangeText={value => this.setState({ password: value })}
          />
        </View>
        <RoundedButton title="Change email" onPress={this._changeEmailPressed} />
      </View>
    );
  }
}
export default ChangeEmail;

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
});
