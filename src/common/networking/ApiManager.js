import { REGISTER_URL } from "../../constants/Constants";

var ApiManager = {
  register: async function(props) {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: props.email,
        password: props.password,
        date: props.selectedDate
      })
    }).catch(error => {
      return { isLoading: false, errorMessage: responseJSON.error };
    });
    if (response.status === 200) {
      return { isLoading: false, success: true };
    }
    const responseJSON = await response.json();
    return { isLoading: false, errorMessage: responseJSON.error };
  }
};

export default ApiManager;
