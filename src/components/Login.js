import React from "react";

const module = {
  //All global data that can be used here.
  functions: {}, //Helpers
};
//--------------------------
//---Main function:
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginInfo: {
        //Used to help keep track of login information.
        username: "",
        password: "",

        username_error_Msg: "",
        password_error_Msg: "",
      },
    };

    //Bind the functions for some reason (because it was not working normally.. tf?):
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // ----------   ----------- \\
  //Main Component Functions:
  componentDidMount() {
    //when the whole component has mounted.
    setTimeout(() => {
      //Delay
      const token = localStorage.getItem("token"); //Attempt to get a client-sided token
      const { navigate } = this.props;

      if (token !== null) {
        //IF the token is found
        navigate("/wheel"); //Redirect the user.
      }
    }, 2);
  }

  onChange = function (evt) {
    //Each time the form gets changed.
    const { Error } = this.props; //Error passed down in props.
    const { id, value } = evt.target; //get the appropriate info from the form
    const { LoginInfo } = this.state;
    let { username_error_Msg, password_error_Msg } = LoginInfo; //Used to determine what the user message says

    const INPUT = module.functions.Get_Label(id); //get the input
    if (INPUT) {
      INPUT.classList.remove("error"); //remove any errors it may have
      password_error_Msg = "";

      if (id === "username") {
        const Admin_Login = module.functions.VerifyUsername(value); //Verify that the inserted username is a(n) admin user.

        if (Admin_Login) {
          INPUT.classList.add("success"); //Tell the user that the input a success
          username_error_Msg = "Valid username"; //update the user msg
        } else {
          INPUT.classList.remove("success"); //Remove any success msg
          username_error_Msg = "";
          module.functions //Update the password input.
            .Get_Label("password")
            .classList.remove("success", "error");
        }
      }
    } else {
      //Else, The input could not have been found in the ["input-group"] class.
      //this should not happen.

      //Tell the user.
      console.error(
        `${id} | could not be found within the 'input-group' class \n Consider adding: [${id}] to the 'input-group' class`
      );

      Error("Internal error"); //Let the user know what is up.
      return;
    }

    //set/Update the state:
    this.setState({
      ...this.state, //keep all the original state that was here as well.
      LoginInfo: {
        ...LoginInfo, //keep all the original state that was here as well.
        [id]: value.trim(), //update any new values.
        username_error_Msg, //also update the message.
        password_error_Msg,
      },
    });
  };

  onSubmit = function (evt) {
    //Each time the form gets submitted.
    evt.preventDefault();
    //vars:
    const { Error } = this.props; //Error passed down in props.
    const { navigate } = this.props; //Used to direct to a new page.
    const { LoginInfo } = this.state;
    const { username, password } = LoginInfo;

    const user_input = module.functions.Get_Label("username");
    const pass_input = module.functions.Get_Label("password");
    const submit_button = module.functions.Get_Label("submit");

    if (!username.trim() || !password.trim()) {
      //If the user has not inputted any information.
      Error("Please provide valid login information"); //Notify the user

      //If the username input was left blank:
      if (!username.trim()) {
        //user_input.classList.remove("success");
        user_input.classList.add("error"); //show the error.
      }

      //If the password input was left blank:
      if (!password.trim()) {
        //pass_input.classList.remove("success");
        pass_input.classList.add("error");
      }

      return; //end the whole func here.
    }
    //.
    user_input.classList.remove("error");
    pass_input.classList.remove("error");

    submit_button.style.visibility = "hidden"; //Hide the button

    const success = module.functions.Attempt_Login(username, password); //Attempt to login.
    if (success === true) {
      //IF the login was a success
      console.log(`Welcome - ${username}!`);

      setTimeout(() => {
        console.log("Redirected.");
        submit_button.style.visibility = "visible"; //show the button
        navigate("/wheel"); //Redirect the user.
      }, 15);
    } else {
      //Else, the login was a bust. (FAILURE)
      let username_error_Msg = //Used to show the user if the username is wong
        module.functions.VerifyUsername(username) === true //verify if the username is correct
          ? "Valid username"
          : "";
      let password_error_Msg = ""; //Used to show the user if the password is wrong

      switch (success) {
        case "username": //IF the username was not valid,
          user_input.classList.add("error");
          username_error_Msg = "Invalid username"; //tell the user
          break;

        case "password": //IF the password was not valid,
          pass_input.classList.add("error");
          password_error_Msg = "Incorrect password"; //tell the user.
          break;

        default:
          break; //IF nothing was found, just return nothing.
      }

      //Update state:
      this.setState({
        ...this.state, //keep all the original state that was here as well.
        LoginInfo: {
          ...LoginInfo, //keep all the original state that was here as well.
          username_error_Msg: username_error_Msg, //update username message.
          password_error_Msg: password_error_Msg, //update password message
        },
      });

      setTimeout(() => {
        submit_button.style.visibility = "visible"; //show the button
      }, 100);
    }
  };
  //---
  //
  //Render to the screen:----
  render() {
    //Render items to the screen for the user to see:
    return (
      <div className="LOGIN">
        <div className="login-container">
          {/* LOGIN FORM */}
          <form className="form" onSubmit={this.onSubmit}>
            {/*USERNAME BOX: */}
            <div className="input-group input-username">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                onChange={this.onChange}
                value={this.state.LoginInfo.username} //Controlled form input
                name="username"
                id="username"
              />
              <span className="msg">
                {this.state.LoginInfo.username_error_Msg}
              </span>
            </div>

            {/*PASSWORD BOX: */}
            <div className="input-group input-password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.onChange}
                value={this.state.LoginInfo.password} //Controlled form input
              />
              <span className="msg">
                {this.state.LoginInfo.password_error_Msg}
              </span>
            </div>

            {/*SUBMIT BUTTON*/}
            <button type="submit" className="login-button input-submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
    //[ CREDIT TO WDS:| https://www.youtube.com/watch?v=reumU4CvruA ]
  }
}
//
//-------------
//Extra info:
module.admin_LOGIN = [
  //All of the qualified login names and their corresponding passwords:
  { username: "MidnightMist", password: "12345" },
  { username: "PixelPenguin", password: "67890" },
  { username: "ElectricHaze", password: "0112131415" },
  { username: "CosmicSpectrum", password: "5161718192" },
];

//
//-------------
//Extra functions to help the main component:
module.functions.Get_Label = function (t) {
  //This function will retrieve and validate the required input label.

  const selectors = {
    //Used to determine which input goes to which class.
    username: ".input-username",
    password: ".input-password",
    submit: ".input-submit",
  };

  const selector = selectors[t];
  if (t === "ALL") {
    //IF ALL of the selectors are needed
    const data = {};
    for (let x in selectors) {
      data[x] = document.querySelector(selectors[x]); //Add all of the selectors to the data about to be sent back
    }
    return data; //Send back ALL of the selectors.
  }

  if (selector === undefined) {
    //IF the selector could not be found
    return false; //return false
  }

  //Else,
  return document.querySelector(selector); //return the corresponding class.
};

module.functions.VerifyUsername = function (v) {
  //This function will verify that the inputted username is correct.
  for (let x of module.admin_LOGIN) {
    //Loop through all of the correct Logins
    if (x.username != null) {
      //IF the child has a username child then
      const username = x.username.toString(); //grab the username of THIS CURRENT child in the rotation.

      if (v.trim() == username) {
        //If the username input matches the current username in the loop.
        return true;
      }
    }
  }

  return false; //return false if the username was not found.
};

module.functions.VerifyPassword = function (u, p) {
  //This function will verify that the inputted password is correct.
  for (let x of module.admin_LOGIN) {
    //Loop through all of the correct Logins
    if (x.username != null && x.password != null) {
      //IF the child has a username child then
      const username = x.username.toString(); //grab the username of THIS CURRENT child in the rotation.
      const password = x.password.toString(); //grab the password of THIS CURRENT child

      if (u == username && p == password) {
        return true; //correct password.
      }
    }
  }

  return false; //return false if the username was not found.
};

module.functions.Attempt_Login = function (username, password) {
  //EACH time the user will attempt to login with some kind of information.
  //This function will verify if the user has valid login information and login them in or not.

  const user = username.trim();
  const pass = password.trim();
  //----
  const Verify_Username = module.functions.VerifyUsername(user); //Verify if the username is correct.
  const Verify_Password = module.functions.VerifyPassword(user, pass); //Verify if the password is correct.

  //IF the user and password are correct:
  if (Verify_Username === true && Verify_Password === true) {
    if (localStorage.getItem("token") == null) {
      //IF there is not already a token made
      const token = [
        { username: user, password: pass },
        "secret_Message",
        { expiresIn: "1h" },
      ];
      localStorage.setItem("token", token);
    }
    return true;
  } else {
    //ELSE, The login information was not correct
    if (Verify_Username === false) {
      return "username"; //return a 'code' for other functions to deal with.
    }

    if (Verify_Password === false) {
      return "password"; //return a 'code' for other functions to deal with.
    }

    return false;
  }
};
//
//
//---------------
///-------------------------exports:
export default Login;
