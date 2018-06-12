import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";

import { LOGIN_URL } from "../../../constants/Constants";
import Loader from "../../../Loader/Loader";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  _hideSpinnerWithText(text) {
    this.setState({ loading: false });
    setTimeout(() => {
      Alert.alert(text);
    }, 100);
  }

  _loginPressed() {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const password = this.state.password;
    const email = this.state.email;
    if (email.trim() == "") {
      Alert.alert("Enter email");
    } else if (password.trim() == "") {
      Alert.alert("Enter password");
    } else if (emailRegex.test(this.state.email) === false) {
      Alert.alert("Email is Not Correct");
    } else {
      this.setState({ loading: true });
      this._loginWithAPI();
    }
  }

  async _loginWithAPI() {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).catch(error => {
      this._hideSpinnerWithText(error)
    });
    const responseJSON = await response.json();
    if (response.status === 200) {
      this.setState({ loading: false });
      AsyncStorage.setItem("token", responseJSON.token);
      this.props.navigation.navigate("TabNavigator");
      return;
    }
    this._hideSpinnerWithText(responseJSON.error)
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => this.setState({ email: value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            returnKeyType="done"
            secureTextEntry
            ref={input => (this.passwordInput = input)}
            onChangeText={value => this.setState({ password: value })}
          />
        </View>
        <View style={styles.customButtonContainer}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={this._loginPressed.bind(this)}
          >
            <Text style={styles.customButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={styles.customButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    borderColor: "#34495e",
    borderWidth: 0.5,
    borderRadius: 10
  },
  customButtonContainer: {
    flex: 2,
    alignItems: "center"
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
