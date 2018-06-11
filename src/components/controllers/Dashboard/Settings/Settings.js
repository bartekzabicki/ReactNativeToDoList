import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";

class Settings extends Component {

  async _logoutUser() {
    await AsyncStorage.removeItem("token")
    this.props.navigation.navigate("Login")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 16 }} />
        <TouchableOpacity
          style={styles.customButton}
          onPress={() =>
            this.props.navigation.navigate("MyProfile")
          }
        >
          <Text style={styles.customText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() =>
            this.props.navigation.navigate("ChangeEmail")
          }
        >
          <Text style={styles.customText}>Change email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() =>
            this.props.navigation.navigate("ChangePassword")
          }
        >
          <Text style={styles.customText}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customButton}
          onPress={this._logoutUser.bind(this)}
        >
          <Text style={styles.customText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  customButton: {
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    justifyContent: "center"
  },
  customText: {
    marginLeft: 16,
    fontSize: 16
  }
});
