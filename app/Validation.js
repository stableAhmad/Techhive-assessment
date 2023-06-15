import Toast from "react-native-simple-toast";

export default class Validation {
     firstName = "";
     lastName = "";
     email = "";
     password = "";
     confirmPassword = "";
     login = false;

     constructor(
          email,
          password,
          firstName = "",
          lastName = "",
          confirmPassword = "",
          login = true
     ) {
          this.email = email;
          this.password = password;
          this.firstName = firstName;
          this.lastName = lastName;
          this.confirmPassword = confirmPassword;
          this.login = login;
     }

     validate() {
          let names = true;
          if (!this.login) {
               names = this.validateNames();
          }
          let email = true;
          if (names) {
               email = this.validateEmail();
          } else {
               return false;
          }
          let pass = true;
          if (email) {
               pass = this.validatePassword();
          } else {
               return false;
          }
          return pass;
     }

     validateEmail() {
          if (this.email === "") {
               showToast("Email field cannot be empty ");
               return false;
          }
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const res = regex.test(this.email);

          if (!res) {
               showToast("Please enter a valid email");
          }
          return res;
     }

     validatePassword() {
          if (this.password.length > 20 || this.password.length < 8) {
               console.log(this.password.length);
               showToast("Password length has to be between 8 and 20");
               return false;
          }

          if (!this.login) {
               console.log("here");
               if (this.password !== this.confirmPassword) {
                    showToast(
                         "Fields password and confirm password have to be equal"
                    );
                    return false;
               }
          }
          return true;
     }

     validateNames() {
          if (this.firstName.length === 0 || this.lastName.length === 0) {
               showToast("Name fields are necessary");
               return false;
          }
          return true;
     }
}

function showToast(text) {
     Toast.show(text, Toast.SHORT);
}
