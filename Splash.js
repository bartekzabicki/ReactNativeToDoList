import React, { Component } from "react";
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";

class Splash extends Component {
  render() {
    setTimeout(() => {
      AsyncStorage.getItem("token")
        .then(value => {
          if (value != null) {
            this.props.navigation.navigate("TabNavigator");
          } else {
            this.props.navigation.navigate("Login");
          }
        })
    }, 1000);
    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>To Do App!</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>The best To Do App in world!</Text>
        </View>
      </View>
    );
  }
}
export default Splash;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#d35400",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold"
  },
  subtitle: {
    color: "white",
    marginBottom: 16
  },
  titleWrapper: {
    flex: 1,
    justifyContent: "center"
  }
});
