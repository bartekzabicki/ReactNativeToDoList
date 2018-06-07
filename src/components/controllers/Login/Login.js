import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import { createStackNavigator } from 'react-navigation';


export default class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Button title="Sign In!" onPress={() => this.props.navigation.navigate('List')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})