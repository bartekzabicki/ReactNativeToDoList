import React from "react";
import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { createRootNavigator } from "./router";
import { isSignedIn } from "./auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    
    if (!checkedSignIn) {
      return null;
    }
    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}
