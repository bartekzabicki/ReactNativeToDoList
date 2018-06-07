import React from "react";
import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";

import Splash from './Splash';
import Main from './src/components/Main/Main'

export default class App extends React.Component {

  loginPressed() {
    Alert.alert("Kliknieto")
  }

  registerPressed() {

  }

  render() {
    return (
      <Splash/>
      // <ScrollView>
      //   <View style={styles.container}>
      //     <Text style={styles.description}>This is To Do App!</Text>
      //     <View style={styles.textInputContainer}>
      //       <TextInput 
      //       style={styles.roundedInput}
      //        placeholder="Enter email" />
      //       <TextInput
      //         style={styles.roundedInput}
      //         placeholder="Enter password"
      //       />
      //       <TextInput
      //         style={styles.roundedInput}
      //         placeholder="Enter address"
      //       />
      //       <TextInput
      //         style={styles.roundedInput}
      //         placeholder="Enter birthday date"
      //       />
      //     </View>
      //     <TouchableOpacity
      //     style={styles.loginScreenButton}
      //     onPress={this.loginPressed}
      //     underlayColor='#fff'>
      //     <Text style={styles.submitText}>Login</Text>
      //   </TouchableOpacity>
      //   </View>
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
    width: 300,

  },
  description: {
    fontSize: 18,
    color: "#656565",
    marginTop: 24,
    textAlign: "center"
  },
  textInputContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  roundedInput: {
    flex: 1,
    height: 34,
    borderColor: "#000",
    borderBottomWidth: 0.5,
    borderRadius: 8,
    fontSize: 18,
    marginTop: 16,
    paddingLeft: 4,
    margin: 8
  },
  loginScreenButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#1E6738',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    width: 200,
  },
  loginText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }
});
