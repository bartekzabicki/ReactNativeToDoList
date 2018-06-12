import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";

import RoundedButton from "../../../../common/components/RoundedButton"

class ChangePassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  };

  _changeEmailPressed = () => {
    if (this.state.oldPassword.trim() == "") {
      Alert.alert("Enter old password")
    } else if (this.state.newPassword.trim() == "") {
      Alert.alert("Enter new password")
    } else if (this.state.confirmNewPassword.trim() == "") {
      Alert.alert("Confirm new password ")
    } else {
      if (this.state.newPassword.trim() == this.state.confirmNewPassword.trim()) {
        Alert.alert("Send to API")
      } else {
        Alert.alert("Passwords are different")
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Old password"
            returnKeyType="next"
            secureTextEntry
            onSubmitEditing={() => this.newPasswordInput.focus()}
            onChangeText={value => this.setState({ oldPassword: value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => this.confirmNewPasswordInput.focus()}
            ref={input => (this.newPasswordInput = input)}
            onChangeText={value => this.setState({ newPassword: value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            secureTextEntry
            returnKeyType="done"
            ref={input => (this.confirmNewPasswordInput = input)}
            onChangeText={value => this.setState({ confirmNewPassword: value })}
          />
        </View>
        <RoundedButton title="Change password" onPress={this._changeEmailPressed} />
      </View>
    );
  }
}
export default ChangePassword;

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
