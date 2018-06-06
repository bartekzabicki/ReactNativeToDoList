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
} from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.description}>This is To Do App!</Text>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.roundedInput} placeholder="Enter email" />
            <TextInput
              style={styles.roundedInput}
              placeholder="Enter password"
            />
            <TextInput
              style={styles.roundedInput}
              placeholder="Enter address"
            />
            <TextInput
              style={styles.roundedInput}
              placeholder="Enter birthday date"
            />
            <Button onPress={() => {}} color="#48BBEC" title="Go" />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
  },
  description: {
    fontSize: 18,
    color: "#656565",
    marginTop: 40,
    textAlign: "center"
  },
  textInputContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  roundedInput: {
    flex: 1,
    height: 34,
    borderColor: "#000",
    borderBottomWidth: 0.5,
    borderRadius: 8,
    fontSize: 18,
    marginTop: 16,
    width: 300,
    paddingLeft: 4
  }
});
