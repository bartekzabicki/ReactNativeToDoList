import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

import Login from "./src/components/controllers/Login/Login";
import Register from "./src/components/controllers/Registration/Register";
import DashboardTabNavigator from "./src/components/controllers/Dashboard/DashboardTabNavigator";

export const LoginNavigator = new createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Registration"
    }
  }
});

export default LoginNavigator;

export const createRootNavigator = (signedIn = false) => {
  return new createSwitchNavigator(
    {
      LoginNavigator: {
        screen: LoginNavigator
      },
      TabNavigator: {
        screen: DashboardTabNavigator
      }
    },
    {
      initialRouteName: signedIn ? "TabNavigator" : "LoginNavigator"
    }
  );
};
