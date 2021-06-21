"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const server = express();
server.use(cors());

const PORT = process.env.PORT;

////////////////////////////////////////////// routes ///////////////////////////////////////

//localhost:3001
server.get("/", homeHandler);

//localhost:3001/books
server.get("/books", booksHandler);

////////////////////////////////////////// mongoose ///////////////////////////////////////////
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(`mongodb://localhost:27017/books`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// schemas:
const book = new mongoose.Schema({
  name: String,
  desc: String,
  img: String,
});

const owner = new mongoose.Schema({
  email: String,
  books: [book],
});

// modals
const Owners = mongoose.model("Owner", owner);

// funtions:

function seedOwnersCollection() {
  const ibrahim = new Owners({
    email: "ibrahemaldrynee@gmail.com",
    books: [
      {
        name: "book1",
        desc: "This book talk about animals",
        img: "https://images3.penguinrandomhouse.com/cover/9781465414571",
      },
      {
        name: "book2",
        desc: "this book talks about food",
        img: "https://images4.penguinrandomhouse.com/cover/9781611806175",
      },
    ],
  });

  ibrahim.save();
}
// seedOwnersCollection();

//////////////////////////////////////////// functions //////////////////////////////////////

function homeHandler(req, res) {
  res.send("Home page");
}

function booksHandler(req, res) {
  let email = req.query.email;

  Owners.find({ email: email }, (err, data) => {
    err ? console.log("there is error") : res.send(data[0].books);
  });
}

/////////////////////////////////////////// listen ///////////////////////////////////////////

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
