import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, AsyncStorage } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import ActionButton from 'react-native-action-button';
import TaskCellComponent from "./TaskCellComponent/TaskCellComponent";

export default class MyList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }
  
  componentDidMount() {
    this.makeRemoteRequest();
  }
  async makeRemoteRequest() {
    const { page, seed } = this.state;
    const url = `http://213.32.87.132:3000/api/notes`;
    this.setState({ loading: true });
    AsyncStorage.getItem("token").then((value) => {
      this.setState({"token": value});
  })
  .then(res => {
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": this.state.token
        }
      }).then(response => {
        response.json().then((responseJSON) => {
          if (response.status === 200) {
            this.setState({
              data: responseJSON,
              error: null,
              loading: false,
              refreshing: false
            });
            return
          } else {
            Alert.alert(responseJSON.error)
          }
        }).catch( (error) => {
          Alert.alert(error)
        });
      }).catch( (error) => {
        Alert.alert(error)
      });
  });
  }

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TaskCellComponent navigation={this.props.navigation}
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.registered}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress= {() => console.log("abc2")}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
          onPress= {() => console.log("abc2")}
        />
        <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => { this.props.navigation.navigate("NewTask") }}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
