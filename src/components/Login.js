import React from "react";

//---Main function:
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // ----------   ----------- \\

  render() {
    //Render items to the screen for the user to see:
    return (
      <div className="LOGIN">
        <div className="login-container">
          <form class="form">
            <div class="input-group success">
              <label for="username">Username</label>
              <input type="text" name="username" id="username" />
              <span class="msg">Valid username</span>
            </div>

            <div className="input-group error">
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
              <span class="msg">Incorrect password</span>
            </div>

            <button type="submit" class="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const adminLogin = {
  username: "12345",
  password: "54321",
};

export default Login;
