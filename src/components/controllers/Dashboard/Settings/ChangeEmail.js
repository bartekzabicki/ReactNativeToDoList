import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

class ChangeEmail extends Component {
  state = {
    email: "",
    password: ""
  };

  _changeEmailPressed = () => {
    Alert.alert(this.state.email);
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
            returnKeyType="next"
            ref={input => (this.passwordInput = input)}
            onChangeText={value => this.setState({ password: value })}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.customButton}
            onPress={this._changeEmailPressed}
          >
            <Text style={styles.customButtonText}>Change email</Text>
          </TouchableOpacity>
        </View>
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
