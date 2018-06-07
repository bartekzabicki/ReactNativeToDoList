import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import TimerMixin from "react-timer-mixin";
import { createStackNavigator } from 'react-navigation';
export default class Splash extends React.Component {
    
    render() {
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 500)
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

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#d35400',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        color: 'white',
        marginBottom: 16
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center'
    }
})