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
    return <form id="loginForm"></form>;
  }
}

const adminLogin = {
  username: "12345",
  password: "54321",
};

export default Login;
