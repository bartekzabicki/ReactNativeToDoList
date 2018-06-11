import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";

class EditTask extends Component {

  state = {
    name: "",
    description: ""
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            defaultValue = {this.state.name}
            placeholder="Name"
            returnKeyType="next"
            secureTextEntry
            onSubmitEditing={() => this.newPasswordInput.focus()}
          />
          <TextInput
            style={styles.input}
            defaultValue = {this.state.description}
            placeholder="Description"
            returnKeyType="next"
            onSubmitEditing={() => this.confirmNewPasswordInput.focus()}
            ref={input => (this.newDescription = input)}
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
export default EditTask;

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


