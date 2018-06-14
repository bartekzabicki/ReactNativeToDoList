import {
  REGISTER_URL,
  LOGIN_URL,
  ADD_NOTE_URL,
  FETCH_NOTES_URL
} from "../../constants/Constants";
import {AsyncStorage} from "react-native";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

let postMethod = "POST";

var ApiManager = {
  register: async function(props) {
    const response = await fetch(REGISTER_URL, {
      method: postMethod,
      headers: headers,
      body: JSON.stringify({
        email: props.email,
        password: props.password,
        date: props.selectedDate
      })
    }).catch(error => {
      return { errorMessage: error };
    });
    if (response.status === 200) {
      return { success: true };
    }
    const responseJSON = await response.json();
    return { errorMessage: responseJSON.error };
  },

  login: async function(props) {
    const response = await fetch(LOGIN_URL, {
      method: postMethod,
      headers: headers,
      body: JSON.stringify({
        email: props.email,
        password: props.password
      })
    }).catch(error => {
      return { errorMessage: error };
    });
    const responseJSON = await response.json();
    if (response.status === 200) {
      return { success: true, token: responseJSON.token };
    }
    return { errorMessage: responseJSON.error };
  },

  newTask: async function(props) {
    var data = {
      title: props.title,
      content: props.content,
      latitude: props.latitude,
      longitude: props.longitude,
      date: props.selectedDate
     };
     var token = await AsyncStorage.getItem("token");
     fetch(ADD_NOTE_URL, {
      method: postMethod,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify(data)
    }).then(response => {
      response.json().then((responseJSON) => {
        if (response.status === 200) {
          console.log("success")
          return { success: true };
        } else {
          return { success: false, errorMessage: responseJSON.error};
        }
      }).catch((error) => {
        return { success: false, errorMessage: error};
      });
    }).catch((error) => {
      return { success: false, errorMessage: error};
    });
  },

  fetchTasks: async function(props) {
    const { page, resultsPerPage } = props;
    const url = `${FETCH_NOTES_URL}?page=${page}&results=${resultsPerPage}`;
    console.log(url)
    let token = await AsyncStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": token
      }
    }).catch(error => {
      return { errorMessage: error };
    });
    const responseJSON = await response.json()
    if (response.status === 200) {
      return { success: true, response: responseJSON }
    } else {
      return { errorMessage: responseJSON.error }
    }
  }

};

export default ApiManager;
