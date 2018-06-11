import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements";

import { users } from "./data";
import ActionButton from 'react-native-action-button';
import TaskCellComponent from "./TaskCellComponent/TaskCellComponent";

class MyList extends Component {
  render() {
    return (
      <View>
      <ScrollView>
        <FlatList>
          {users.map(user => (
            <TaskCellComponent
              key={user.login.username}
              title={`${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}`}
              subtitle={user.registered}
              // onPress={() => this.onLearnMore(user)}
            />
          ))}
        </FlatList>
      </ScrollView>
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => { this.props.navigation.navigate("NewTask") }}
      />
      </View>
    );
  }
}
export default MyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
