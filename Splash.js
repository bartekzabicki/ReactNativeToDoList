import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

export default class Splash extends React.Component {
    render() {
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