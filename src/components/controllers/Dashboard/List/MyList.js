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
      data: [],
      error: null,
      page: 1,
      resultsPerPage: 10,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }
  async makeRemoteRequest() {
    const { page, resultsPerPage } = this.state;
    const url = `http://213.32.87.132:3000/api/notes?page=${page}&results=${resultsPerPage}`;
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
              // console.log(responseJSON.results)
              this.setState({
                data: responseJSON.results.length > 0 ? responseJSON.results : null,
                initial: responseJSON.results.length > 0 ? responseJSON.results : null,
                error: null,
                loading: false,
                refreshing: false
              });
              console.log(responseJSON.results.length);
              return
            } else {
              // console.log(responseJSON.error);
              Alert.alert(responseJSON.error)
            }
          }).catch((error) => {
            // console.log(error);
            Alert.alert(error)
          });
        }).catch((error) => {
          // console.log(error);
          Alert.alert(error)
        });
      });
  }

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
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
    return <SearchBar
      placeholder="Type Here..."
      lightTheme
      round
      onChangeText={this.searchBarOnChange} />;
  };

  searchBarOnChange = (e) => {
    let text = e.toLowerCase()
    let items = this.state.initial != null ? this.state.initial : []
    let filteredName = items.filter((item) => {
      return item.title.toLowerCase().match(text)
    })
    if (!text || text === '') {
      this.setState({
        data: this.state.initial != null ? this.state.initial : null
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
      <View style={styles.container}>
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
            style={styles.list}
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
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  list: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});
