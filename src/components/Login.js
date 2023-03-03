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
        password_error_msg: "",
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
    let username_error_Msg = ""; //Used to determine what the user message says

    const INPUT = module.functions.Get_Label(id);
    if (INPUT !== undefined) {
      switch (id) {
        case "password": //If the input is password
          INPUT.classList.remove("error");

          break;
        case "username": //If the input is username
          const Correct_Login = module.functions.VerifyUsername(value);

          if (Correct_Login === true) {
            INPUT.classList.add("success"); //Add a classlist to it.
            username_error_Msg = "Valid username"; //Update the username msg to tell the user.
          } else {
            INPUT.classList.remove("success"); //remove any possible success attribute it might have.
            INPUT.classList.remove("error"); //remove any possible error attribute it might have.
          }
          break;
        default:
          //By default just return false.
          return false; //Although this should not happen
      }
    } else {
      //Else,
      //The input could not have been found in the ["input-group"] class.
      //this should not happen.

      console.error(
        //Tell the user.
        id +
          " | could not be found within the 'input-group' class. \n Consider adding: [" +
          id +
          "] to the 'input-group' class."
      );

      Error("Internal error"); //Let the user know what is up.
    }

    //set/Update the state:
    this.setState({
      ...this.state, //keep all the original state that was here as well.
      LoginInfo: {
        ...LoginInfo, //keep all the original state that was here as well.
        [id]: value, //update any new values.

        username_error_Msg: username_error_Msg, //also update the message.
      },
    });
  };

  onSubmit = function (evt) {
    //Each time the form gets submitted.
    evt.preventDefault();
    //TODO: FINISH THIS FUNCTION
    const { Error } = this.props; //Error passed down in props.
    const { username, password } = this.state.LoginInfo;

    const user_input = module.functions.Get_Label("username");
    const pass_input = module.functions.Get_Label("password");

    if (username.trim().length > 0 && password.trim().length > 0) {
      //IF the form has some information within it.
      user_input.classList.remove("error");
      pass_input.classList.remove("error");

      const success = module.functions.Attempt_Login(username, password);
      switch (success) {
        case true: {
          //The login was a success
          console.log("SUCCESS");
          //Navigate to new page
          break;
        }

        case "username": {
          //The username was not correct.
          user_input.classList.add("error");
          break;
        }

        default:
          //The login was a bust.
          console.log("FAILED", success);
          break;
      }
    } else {
      Error("Please provide valid login information"); //Invoke the error function

      if (username.trim().length == 0) {
        user_input.classList.add("error");
      }

      if (password.trim().length == 0) {
        pass_input.classList.add("error");
      }
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
                {this.state.LoginInfo.password_error_msg}
              </span>
            </div>

            {/*SUBMIT BUTTON*/}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
    //[ CREDIT TO WDS:| https://www.youtube.com/watch?v=reumU4CvruA ]
  }
}
//-------------
//Extra info:
module.admin_LOGIN = [
  //All of the qualified login names and their corresponding passwords:
  { username: "CosmicSpectrum", password: "12345" },
  { username: "PixelPenguin", password: "67890" },
  { username: "ElectricHaze", password: "0112131415" },
  { username: "MidnightMist", password: "5161718192" },
];

//
//-------------
//Extra functions to help the main component:
module.functions.Get_Label = function (t) {
  //This function will retrieve and validate the required input label.
  const Login_inputs = document.getElementsByClassName("input-group"); //Grab BOTH of the login inputs

  if (t !== "ALL") {
    //IF the input does NOT need a specific input
    for (let input of Login_inputs) {
      if (input.classList.contains("input-" + t)) {
        return input; //return the corresponding input.
      }
    }
  } else {
    return Login_inputs; //Return all of the inputs.
  }

  return undefined; //nothing could have been found so return nothing.
};

module.functions.VerifyUsername = function (v) {
  //This function will verify that the inputted username is correct.
  for (let x of module.admin_LOGIN) {
    //Loop through all of the correct Logins
    if (x.username != null) {
      //IF the child has a username child then
      const username = x.username.toString(); //grab the username of THIS CURRENT child in the rotation.

      if (v == username) {
        //If the username input matches the current username in the loop.
        return true;
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

  const Verify_Username = module.functions.VerifyUsername(user);

  if (Verify_Username === true) {
    //Verify that the password is correct
    //IF not correct, tell the user
    //ELSE, Login

    return true;
  } else {
    //The login information was not correct
    return "username";
  }
};
//
//
//---------------
///-------------------------exports:
export default Login;
