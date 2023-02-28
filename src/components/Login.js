import React from "react";

const functions = {}; //Helpers
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

      buttonDisabled: false, //Used for the login button disabilities.
    };

    //Bind the functions for some stupid reason (because it was not working normally.. tf?):
    this.onChange = this.onChange.bind(this);
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
    const { id, value } = evt.target; //get the appropriate info from the form
    const { LoginInfo } = this.state;
    let username_error_Msg = ""; //Used to determine what the user message says

    if (id === "username") {
      //IF the input is the 'username' input then
      const input = document.getElementsByClassName("input-username"); //Grab the username input

      for (let x of admin_LOGIN) {
        //Loop through all of the correct Logins
        if (x.username != null) {
          //IF the child has a username child then
          const username = x.username.toString(); //grab the username of THIS CURRENT child in the rotation.

          console.log(value, username);
          if (value == username) {
            //IF the value of the input matches this username then,
            input[0].classList.add("success"); //Add a classlist to it.
            //NOTE: We are just assuming that there is only 1 item in the array and that this IS the correct item we need.
            //NOTE: Not a good practice. Check and verify you have the correct item.
            //NOTE: However, because I know I only used 1 item with this className, I know for a fact I am safe.

            username_error_Msg = "Valid username"; //Update the username msg to tell the user.
            break; //end the loop.
          } else {
            //else
            //NOTE: Same deal applies here just as above.
            input[0].classList.remove("success"); //remove any possible success attribute it might have.
          }
        }
      }
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
    evt.preventDefault();
  };

  render() {
    //Render items to the screen for the user to see:
    return (
      <div className="LOGIN">
        <div className="login-container">
          {/* LOGIN FORM */}
          <form className="form" onSubmit={this.onSubmit}>
            <div className="input-group input-username">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                onChange={this.onChange}
                value={this.state.LoginInfo.username}
                name="username"
                id="username"
              />
              <span className="msg">
                {this.state.LoginInfo.username_error_Msg}
              </span>
            </div>

            <div className="input-group input-password">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
              <span className="msg">Incorrect password</span>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
//-------------
//Extra info:
const admin_LOGIN = [
  //All of the qualified login names:
  { username: "CosmicSpectrum", password: "12345" },
  { username: "PixelPenguin", password: "67890" },
  { username: "ElectricHaze", password: "0112131415" },
  { username: "MidnightMist", password: "5161718192" },
];

//-------------
//Extra functions to help the main component:
functions.Verify = function (t) {};

///----exports:
export default Login;
