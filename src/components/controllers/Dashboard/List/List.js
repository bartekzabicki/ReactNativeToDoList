import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";

class List extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text>List</Text>
            </View>
        );
    }
}
export default List;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});