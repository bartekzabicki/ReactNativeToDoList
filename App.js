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
import List from './src/components/controllers/List/List';
import Register from './src/components/controllers/Registration/Register';

export default class App extends React.Component {

  render() {
    return <AppStackNavigator />;
  }

}

const AppStackNavigator = new createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Registration"
    }
  }
})
