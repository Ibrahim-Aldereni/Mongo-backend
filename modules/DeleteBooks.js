const MongooseItems = require("./mongoose-books"); // this one is object cuz i export two things from mongoose-books

function deletebooksHandler(req, res) {
  let email = req.query.email;
  let id = req.params.id;

  MongooseItems.Owners.find({ email: email }, (err, data) => {
    if (err) {
      res.status(500).send("there is error");
    } else {
      let newData = data[0].books.filter((book) => {
        return book._id != id;
      });

      data[0].books = newData; // to update new books after deletion
      data[0].save();
      res.send(newData);
    }
  });
}

module.exports = deletebooksHandler;
