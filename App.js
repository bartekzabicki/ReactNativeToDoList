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
  TouchableOpacity
} from "react-native";

import { createStackNavigator } from 'react-navigation';

import Splash from './Splash';
import Login from './src/components/controllers/Login/Login';
import Register from './src/components/controllers/Registration/Register';
import DashboardTabNavigator from './src/components/controllers/Dashboard/DashboardTabNavigator';

export default class App extends React.Component {

  render() {
    return <AppStackNavigator />;
  }

}

const AppStackNavigator = new createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null,
    }
  },
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
  },
  TabNavigator: {
    screen: DashboardTabNavigator,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
})
