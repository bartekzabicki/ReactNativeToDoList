import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements";

import { users } from "./data";

class MyList extends Component {
  render() {
    return (
      <ScrollView>
        <List>
          {users.map(user => (
            <ListItem
              key={user.login.username}
              roundAvatar
              avatar={{ uri: user.picture.thumbnail }}
              title={`${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}`}
              subtitle={user.email}
              // onPress={() => this.onLearnMore(user)}
            />
          ))}
        </List>
      </ScrollView>
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
