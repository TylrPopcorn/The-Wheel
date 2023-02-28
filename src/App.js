import React from "react";
import { Routes, Route } from "react-router-dom";

import "../styles/styles.css";

import Login from "./components/Login"; //Login page.
//---------
//Main function:
function App() {
  return (
    //html
    <div className="full-screen-container">
      <button id="logout">Logout</button>
      <h1 className="title">The Wheel</h1> {/* Title */}
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

//  <div className="full-screen-container">
//       <button id="logout">Logout</button>
//       <h1>The Wheel</h1> {/* Title */}
//       <Routes>
//         {/* Routes */}
//         <Route path="/" element={<Login />} />

//         <Route
//           exact
//           path="wheel"
//           //element={}
//         />
//       </Routes>
//     </div>
