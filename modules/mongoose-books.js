require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGODB_URI;

mongoose.connect(`${MONGO_URL}/myFirstDatabase`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// schemas:
const book = new mongoose.Schema({
  name: String,
  desc: String,
  status: String,
});

const owner = new mongoose.Schema({
  email: String,
  books: [book],
});

// modals
const Owners = mongoose.model("owner", owner);

// funtions:

function seedOwnersCollection() {
  const ibrahim = new Owners({
    email: "ibrahemaldrynee@gmail.com",
    books: [
      {
        name: "book1",
        desc: "This book talk about animals",
        status: "life changing",
      },
      {
        name: "book2",
        desc: "this book talks about food",
        status: "Favorite five",
      },
    ],
  });

  ibrahim.save();
}
// seedOwnersCollection(); // this function when called create dummy data in the database

function booksHandler(req, res) {
  let email = req.query.email;

  Owners.find({ email: email }, (err, data) => {
    err ? res.status(500).send("there is error") : res.send(data[0].books);
  });
}

module.exports = {
  booksHandler,
  Owners,
};
