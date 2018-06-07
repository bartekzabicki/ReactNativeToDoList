import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { createStackNavigator } from 'react-navigation';

export default class LoginForm extends React.Component {
  loginPressed() {
    Alert.alert("Login");
  }

  registerPressed() {
    Alert.alert("Register");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry
          />
        </View>
        <View style={styles.customButtonContainer}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={this.loginPressed}
          >
            <Text style={styles.customButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customButton}
            onPress={this.registerPressed}
          >
            <Text style={styles.customButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    height: 40,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    paddingHorizontal: 10,
    color: "black",
    borderColor: '#34495e',
    borderWidth: 0.5,
    borderRadius: 10
  },
  customButtonContainer: {
    flex: 2,
    alignItems: 'center'
  },
  customButton: {
    height: 40,
    backgroundColor: "#34495e",
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    justifyContent: "center",
    borderRadius: 10,
    width: 200,
  },
  customButtonText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    color: 'white'
  }
});