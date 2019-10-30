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
        success: false,
        message: `GET did not work: "${error}"`
      });
    });
});

server.get("/hubs/:id", (req, res) => {});

server.post("/hubs", (req, res) => {
  const hubInfo = req.body;
  db.add(hubInfo)
    .then(hub => {
      res.status(201).json({
        success: true,
        hub
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: `GET did not work: "${error}"`
      });
    });
});

server.delete("/hubs/:id", (req, res) => {
  // const { id } = req.params.id;
  const id = req.params.id;

  db.remove(id)
    .then(deletedHub => {
      if (deletedHub) {
        res.status(204);
      } else {
        res.status(404).json({
          success: false,
          message: `DELETE could not find id: ${id}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        // message: `GET did not work: "${error}"`
        sucess: false,
        error
      });
    });
});

server.put("/hubs/:id", (req, res) => {
  const id = req.params.id;
  const hubInfo = req.body;

  db.update(id, hubInfo)
    .then(hub => {
      if (hub) {
        res.status(200).json({ success: true, hub });
      } else {
        res
          .status(404)
          .json({ success: false, message: `id ${id} can not be updated` });
      }
    })
    .catch(error => {
      res.status(500).json({
        // message: `GET did not work: "${error}"`
        sucess: false,
        error
      });
    });
});

const PORT = 4000 || process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
