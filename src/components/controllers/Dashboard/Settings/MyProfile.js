import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

var ImagePicker = require("react-native-image-picker");
var options = {
  title: "Select image for your note",
  allowsEditing: true,
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: ""
    };
  }

  showImagePicker() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Open picker" onPress={this.showImagePicker.bind(this)} />
        <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
      </View>
    );
  }
}
export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  uploadAvatar: {
    width: 200,
    height: 200
  }
});
