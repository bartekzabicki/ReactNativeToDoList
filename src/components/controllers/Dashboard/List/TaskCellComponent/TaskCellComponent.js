import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native"
;

export default class TaskCellComponent extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>{this.props.title}</Text>
                <Text style={{fontSize: 12}}>{this.props.subtitle}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'left',
    justifyContent:'left',
    marginLeft: 24,
    marginTop: 4,
    marginBottom: 4
    }
});