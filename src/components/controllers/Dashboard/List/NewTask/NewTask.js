import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";

class NewTask extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            returnKeyType="next"
            secureTextEntry
            onSubmitEditing={() => this.newPasswordInput.focus()}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => this.confirmNewPasswordInput.focus()}
            ref={input => (this.newPasswordInput = input)}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.customButton}
            onPress={this._addPressed}
          >
            <Text style={styles.customButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default NewTask;

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

