import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";

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
        <View>
          <TouchableOpacity
            style={styles.customButton}
            onPress={this._changeEmailPressed}
          >
            <Text style={styles.customButtonText}>Change password</Text>
          </TouchableOpacity>
        </View>
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
