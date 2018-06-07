import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator } from 'react-navigation';
import Settings from '../Settings/Settings'

class List extends React.Component {
    static navigationOptions = {
        header: false,
      };

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default createBottomTabNavigator({
    List: List,
    Settings: Settings,
  });