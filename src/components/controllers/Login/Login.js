import React from "react";
import { View, Text, StyleSheet } from "react-native";


import LoginForm from "./LoginForm";

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>To Do App!</Text>
        </View>
        <Text style={styles.subtitle}>Login or register</Text>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white',
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
    marginTop: 24,
  },
  formContainer: {
    width: '100%',
    flex: 1,
    marginTop: 16
  },
});
