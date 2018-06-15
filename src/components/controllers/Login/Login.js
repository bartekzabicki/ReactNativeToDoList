import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import LoginForm from "./LoginForm";

export default class Login extends React.Component {

  static navigationOptions = {
    header: null
 }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>To Do App!</Text>
        </View>
        <Text style={styles.subtitle}>Login or register</Text>
        <View style={styles.formContainer}>
          <LoginForm navigation={this.props.navigation} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 16
  },
  titleView: {
    marginTop: 32
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "700"
  },
  subtitle: {
    color: "black",
    marginTop: 24
  },
  formContainer: {
    width: "100%",
    flex: 1,
    marginTop: 16
  }
});
