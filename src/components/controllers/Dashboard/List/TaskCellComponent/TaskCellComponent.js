import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native"
    ;
import Swipeout from 'react-native-swipeout';

export default class TaskCellComponent extends Component {
    render() {

        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { }
        }, {
            text: 'Edit',
            backgroundColor: 'blue',
            underlayColor: 'rgba(0, 0, 0, 1, 0.ć6)',
            onPress: () => { this.props.navigation.navigate("EditTask",{task: this.props.task}) }
        }];

        return (
            <Swipeout right={swipeBtns}
                autoClose='true'
                backgroundColor='transparent'>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("EditTask",{task: this.props.task})
                }}>
                    <View style={styles.container}>
                        <Text style={{ fontSize: 17, fontWeight: '500' }}>{this.props.task.title}</Text>
                        <Text style={{ fontSize: 12 }}>{this.props.task.date}</Text>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 24,
        marginTop: 4,
        marginBottom: 4
    }
});