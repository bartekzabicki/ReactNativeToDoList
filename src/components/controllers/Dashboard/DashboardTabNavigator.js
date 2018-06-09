import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";

import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import List from './List';
import Settings from './Settings';

const ListStack = new createStackNavigator({
    List: {
        screen: List,
        navigationOptions: {
            title: "List"
        }
    }
});

const SettingsStack = new createStackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: "Settings"
        }
    }
});

const DashboardTabNavigator = new createBottomTabNavigator({
    List: ListStack,
    Settings: SettingsStack
});

export default DashboardTabNavigator;


const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});