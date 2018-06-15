import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Swipeout from "react-native-swipeout";

export default class TaskCellComponent extends Component {
  editRowPressed = () => {
    this.props.editRowPressed(this.props.task);
  };

  selectRowPressed = () => {
    this.props.selectRowPressed(this.props.task);
  };

  deleteRowPressed = () => {
    this.props.deleteRowPressed(this.props.task);
  };

  render() {
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        underlayColor: "rgba(0, 0, 1, 0.6)",
        onPress: this.deleteRowPressed
      },
      {
        text: "Edit",
        backgroundColor: "blue",
        underlayColor: "rgba(0, 0, 1, 0.6)",
        onPress: this.editRowPressed
      }
    ];

    return (
      <Swipeout
        right={swipeBtns}
        autoClose={true}
        backgroundColor="transparent"
      >
        <TouchableOpacity onPress={this.selectRowPressed}>
          <View style={styles.container}>
            <Text style={{ fontSize: 17, fontWeight: "500", color: "green" }}>
              {this.props.task.title}
            </Text>
            <View style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 14, color: "gray" }}>
                {this.props.task.content}
              </Text>
            </View>
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
