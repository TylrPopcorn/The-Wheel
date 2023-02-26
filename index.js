//.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//Styles:
//import "./styles/reset.css";
//import "./styles/index.css";

//code related imports:
import App from "./src/App";

/*
  Dependencies:

  npm install react
  npm install parcel-bundler
  npm install react-router-dom

*/
/*------------    -------------*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
