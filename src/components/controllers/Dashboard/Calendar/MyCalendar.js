import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";

class MyCalendar extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text>MyCalendar</Text>
            </View>
        );
    }
}
export default MyCalendar;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});