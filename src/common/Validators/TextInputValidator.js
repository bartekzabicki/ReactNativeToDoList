const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function ValidateLoginFields(email, password) {
  if (email.trim() == "") {
    return { isValidated: false, errorMessage: "Enter email" };
  } else if (password.trim() == "") {
    return { isValidated: false, errorMessage: "Enter password" };
  } else if (emailRegex.test(email) === false) {
    return { isValidated: false, errorMessage: "Email is not correct" };
  } else {
    return { isValidated: true };
  }
}

export function ValidateRegisterFields(fields) {
  if (fields.email.trim() == "") {
    return { isValidated: false, errorMessage: "Enter email" };
  } else if (fields.password.trim() == "") {
    return { isValidated: false, errorMessage: "Enter password" };
  } else if (fields.confirmPassword.trim() == "") {
    return { isValidated: false, errorMessage: "Confirm password" };
  } else if (fields.isDatePicked == false) {
    return { isValidated: false, errorMessage: "Choose birthday date" };
  } else if (fields.password != fields.confirmPassword) {
    return { isValidated: false, errorMessage: "Passwords are different" };
  } else if (emailRegex.test(fields.email) === false) {
    return { isValidated: false, errorMessage: "Email is not correct" };
  } else {
    return { isValidated: true };
  }
}
