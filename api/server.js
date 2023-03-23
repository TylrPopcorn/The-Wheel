require("dotenv").config();

const express = require("express");
const server = express();
//----
const PORT = process.env.PORT || 3000;
/**
 * Dependencies
 *
 * npm i nodemon
 * npx eslint --init
 * npm i express
 *
 */
//
//
server.use(express.json()); //JSON body parser.

//
server.listen(() => {
  console.log(`Server is running on port ${PORT}`);
});

//Catch any endpoints that cannot be found:
server.use("*", (req, res) => {
  //catch all 404 errors middleware:
  res.status(404).json({
    message: `${req.method} ${req.baseUrl} not found`,
  });
});

//----Exports:
module.exports = server;
