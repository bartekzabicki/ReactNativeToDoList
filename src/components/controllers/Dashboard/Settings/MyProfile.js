import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";

class MyProfile extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text>MyProfile</Text>
            </View>
        );
    }
}
export default MyProfile;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});