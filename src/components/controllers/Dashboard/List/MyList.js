import React, { Component } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, AsyncStorage, Alert } from "react-native";
import { SearchBar } from "react-native-elements";

import ActionButton from 'react-native-action-button';
import TaskCellComponent from "./TaskCellComponent/TaskCellComponent";
import ApiManager from "../../../../common/networking/ApiManager"

export default class MyList extends Component {

  refreshCallback = () => {
    console.log("Should reload")
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      initial: [],
      data: [],
      error: null,
      page: 1,
      pages: 1,
      resultsPerPage: 10,
      refreshing: false,
      hasAllDataFetched: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  async makeRemoteRequest() {
    if (this.state.loading == false) {
      this.setState({ loading: true });
      let apiResult = await ApiManager.fetchTasks(this.state)
      if (apiResult.success == true) {
        console.log(apiResult.response)
        this.setState({
          data: [...this.state.data, ...apiResult.response.results],
          initial: [...this.state.data, ...apiResult.response.results],
          error: null,
          loading: false,
          refreshing: false,
          pages: apiResult.response.pages,
          page: this.state.page + 1
        })
      } else {
        Alert.alert(apiResult.errorMessage)
      }
    }
  }

  handleRefresh = () => {
    if (this.state.hasAllDataFetched == true) {
      this.setState(
        {
          loading: false,
          initial: [],
          data: [],
          error: null,
          page: 1,
          resultsPerPage: 10,
          refreshing: true,
          hasAllDataFetched: false
        },
        () => {
          console.log(this.state)
          console.log("Refresh")
          this.makeRemoteRequest();
        }
      );
    }
  };

  handleLoadMore() {
    if (this.state.page > this.state.pages) {
      this.setState({ hasAllDataFetched: true })
    } else {
      this.makeRemoteRequest();
    }
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
            // keyExtractor={item => `${item.id}`}
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
