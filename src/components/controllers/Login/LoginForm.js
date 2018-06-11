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

export default class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  _loginPressed() {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,20}$/;
    let password = this.state.password;
    let email = this.state.email;
    if (email.trim() == "") {
      Alert.alert("Enter email");
    } else if (password.trim() == "") {
      Alert.alert("Enter password");
    } else {
      if (emailRegex.test(this.state.email) === false) {
        Alert.alert("Email is Not Correct");
      } else {
        this._loginWithAPI();
      }
    }
  }

  async _loginWithAPI() {
    const response = await fetch("http://213.32.87.132:3000/api/user/login", {
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
      console.error(error);
    });
    const responseJSON = await response.json();
    if (response.status === 200) {
      AsyncStorage.setItem("token", responseJSON.token)
      this.props.navigation.navigate("TabNavigator")
      return
    } else {
      Alert.alert(responseJSON.error)
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
