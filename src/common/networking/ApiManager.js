import { REGISTER_URL } from "../../constants/Constants";
import { LOGIN_URL } from "../../constants/Constants";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
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
  }
};

export default ApiManager;
