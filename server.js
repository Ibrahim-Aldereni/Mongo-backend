"use strict";

require("dotenv").config();
const cors = require("cors");
const express = require("express");

const MongooseItems = require("./modules/mongoose-books");
const addbooksHandler = require("./modules/AddBooks");
const deletebooksHandler = require("./modules/DeleteBooks");

const server = express();
server.use(cors());
server.use(express.json()); // to read POST request as json (if don't use it you will have undefiend)

const PORT = process.env.PORT;

////////////////////////////////////////////// routes ///////////////////////////////////////

//localhost:3001
server.get("/", homeHandler);

//localhost:3001/books
server.get("/books", MongooseItems.booksHandler);

//localhost:3001/addbooks
server.post("/addbooks", addbooksHandler);

//localhost:3001/deletebooks
server.delete("/deletebooks/:id", deletebooksHandler);

//////////////////////////////////////////// functions //////////////////////////////////////

function homeHandler(req, res) {
  res.send("Home page");
}

/////////////////////////////////////////// listen ///////////////////////////////////////////

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
