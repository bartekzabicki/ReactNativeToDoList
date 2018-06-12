const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function ValidateLoginFields(email, password) {
  if (email.trim() == "") {
    return { isValidated: false, errorMessage: "Enter email" };
  } else if (password.trim() == "") {
    return { isValidated: false, errorMessage: "Enter password" };
  } else if (emailRegex.test(email) === false) {
    return { isValidated: false, errorMessage: "Email is not correct" };
  } else {
    return { isValidated: true, errorMessage: "" };
  }
}


