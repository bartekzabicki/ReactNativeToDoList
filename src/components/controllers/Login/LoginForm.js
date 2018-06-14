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

import Loader from "../../../Loader/Loader";
import RoundedButton from "../../../common/components/RoundedButton"
import Validator from "../../../common/validators/TextInputValidator"
import ApiManager from "../../../common/networking/ApiManager";

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
    let result = Validator.loginValidation(this.state.email, this.state.password)
    if (result.isValidated == true) {
      this.setState({ loading: true });
      this._loginWithAPI();
    } else {
      Alert.alert(result.errorMessage)
    }
  }

  async _loginWithAPI() {
    let apiResult = await ApiManager.login(this.state);
    if (apiResult.success == true) {
      this.setState({ loading: false });
      AsyncStorage.setItem("token", apiResult.token);
      this.props.navigation.navigate("TabNavigator");
    } else {
      this._hideSpinnerWithText(apiResult.errorMessage)
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
          <RoundedButton title="Login" onPress={this._loginPressed.bind(this)} />
          <RoundedButton title="Register" onPress={() => this.props.navigation.navigate("Register")} />
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
});
