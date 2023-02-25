import React from "react";
import { Link, Routes, Route } from "react-router-dom";

import Login from "./components/Login"; //Login page.
//---------
//Main function:
function App() {
  return (
    //html
    <div className="App">
      <button id="logout">Logout</button>
      <h1>The Wheel</h1> {/* Title */}
      <nav>
        {/*Navigation*/}
        <Link id="LOGIN_SCREEN" to="/">
          Login
        </Link>
        <Link id="THE_WHEEL" to="/wheel">
          Wheel
        </Link>
      </nav>
      <p id="error">ERRROR</p>
      <Routes>
        {/* Routes */}
        <Route path="/" element={<Login />} />

        <Route
          exact
          path="wheel"
          //element={}
        />
      </Routes>
    </div>
  );
}

export default App;
