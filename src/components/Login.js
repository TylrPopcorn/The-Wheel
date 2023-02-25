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
      <div>
        <form id="loginForm">
          <h2>Login</h2>

          {/* ERROR */}
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input type="username" name="username" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" />
          </div>

          <button type="submit"> LOGIN </button>
        </form>
      </div>
    );
  }
}

const adminLogin = {
  username: "12345",
  password: "54321",
};

export default Login;
