import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, AsyncStorage, Alert } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import ActionButton from 'react-native-action-button';
import TaskCellComponent from "./TaskCellComponent/TaskCellComponent";

export default class MyList extends Component {

  refreshCallback = () => {
    console.log("Should reload")
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      initial: null,
      data: [],
      error: null,
      page: 1,
      pages: 1,
      resultsPerPage: 2,
      refreshing: false
    };
  }

// `http://213.32.87.132:3000/api/notes?

  componentDidMount() {
    this.makeRemoteRequest();
  }
  async makeRemoteRequest() {
    const { data, page, resultsPerPage } = this.state;
    console.log(resultsPerPage)
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
              // console.log("Set pages:" + responseJSON.pages)
              this.setState({
                  pages: responseJSON.pages
                })
              var formattedData = responseJSON.results.length > 0 ? responseJSON.results : null
              if (formattedData != null) {
                this.setState({
                  data: [...this.state.data, ...formattedData]
                })
              }
              this.setState({
                initial: this.state.data,
                error: null,
                loading: false,
                refreshing: false
              });
            // console.log("Set data to: " + this.state.data)
              if (formattedData != null) {
              // console.log("Results:" + formattedData.length)
              }
              if (data != null) {
                // console.log("Data count: "+ data.length)
              }
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
    console.log("Refresh")
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
    if (this.state.page > this.state.pages) {
      return
    }
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
                key={`${item.id}`}
                refreshCallback = {this.refreshCallback}
              />
            )}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore.bind(this)}
            onEndReachedThreshold={50}
            onPress={() => console.log("abc2")}
            style={styles.list}
            extraData={this.state.refreshing}
          />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => { this.props.navigation.navigate("NewTask", {refreshCallback: this.refreshCallback}) }}
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
