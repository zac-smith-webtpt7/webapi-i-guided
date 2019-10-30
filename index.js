const express = require("express");
const dotenv = require("dotenv");
const db = require("./data/hubs-model.js");

const server = express();
server.use(express.json());

const message = {
  messge: "Welcome to Nodeland"
};

server.get("/", (req, res) => {
  res.status(200).json(message);
});

// CRUD ~ Create, Read, Update, Delete
// CRUD ~ POST, GET, PUT, DELETE
// GET will read hubs from database
server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json({
        message: `GET did not work: "${error}"`
      });
    });
});

const PORT = 4000 || process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
