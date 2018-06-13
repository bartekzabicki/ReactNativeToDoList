import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, AsyncStorage, Alert } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import ActionButton from 'react-native-action-button';
import TaskCellComponent from "./TaskCellComponent/TaskCellComponent";

export default class MyList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      initial: null,
      data: null,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    console.log("A");
    this.makeRemoteRequest();
  }
  async makeRemoteRequest() {
    const url = `http://213.32.87.132:3000/api/notes`;
    this.setState({ loading: true });
    AsyncStorage.getItem("token").then((value) => {
      this.setState({ "token": value });
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
                data: responseJSON.size > 0 ? responseJSON : null,
                initial: responseJSON.size > 0 ? responseJSON : null,
                error: null,
                loading: false,
                refreshing: false
              });
              return
            } else {
              console.log(responseJSON.error);
              // Alert.alert(responseJSON.error)
            }
          }).catch((error) => {
            console.log(error);
            // Alert.alert(error)
          });
        }).catch((error) => {
          console.log(error);
          // Alert.alert(error)
        });
      });
  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
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
    return <SearchBar
      placeholder="Type Here..."
      lightTheme
      round
      onChangeText={this.searchBarOnChange} />;
  };

  searchBarOnChange = (e) => {
    let text = e.toLowerCase()
    let items = this.state.initial
    let filteredName = items.filter((item) => {
      return item.title.toLowerCase().match(text)
    })
    if (!text || text === '') {
      this.setState({
        data: this.state.initial
      })
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      this.setState({
        noData: true
      })
    } else if (Array.isArray(filteredName)) {
      this.setState({
        noData: false,
        data: filteredName
      })
    }
  }

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
      <View style={styles.buttonContainer}>
        <View containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TaskCellComponent navigation={this.props.navigation}
                task={item}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => console.log("abc2")}
                key={item.key}
              />
            )}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReachedThreshold={50}
            onPress={() => console.log("abc2")}
          />
        </View>
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
  },
  buttonContainer: {
    flex: 1
  }
});
