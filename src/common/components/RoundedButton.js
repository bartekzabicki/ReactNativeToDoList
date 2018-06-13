import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class RoundedButton extends Component {
  render() {
    const { onPress, title } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={styles.customButton}
          onPress={onPress}
        >
          <Text style={styles.customButtonText}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default RoundedButton;

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 2,
        alignItems: "center"
      },
      customButton: {
        height: 40,
        backgroundColor: "#34495e",
        marginLeft: 24,
        marginRight: 24,
        marginTop: 16,
        justifyContent: "center",
        borderRadius: 10,
        width: 200
      },
      customButtonText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "700",
        color: "white"
      },
});
