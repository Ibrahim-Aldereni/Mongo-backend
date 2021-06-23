const MongooseItems = require("./mongoose-books"); // this one is object cuz i export two things from mongoose-books

function updatebooksHandler(req, res) {
  const { email, name, desc, status } = req.body;
  let id = req.params.id;

  MongooseItems.Owners.find({ email: email }, (err, data) => {
    if (err) {
      res.status(500).send("there is error");
    } else {
      // to get the index according to id
      let index = data[0].books.findIndex((elem) => {
        return elem._id == id;
      });

      // here i want to delete book object then replace it with updated one
      data[0].books.splice(index, 1, {
        name: name,
        desc: desc,
        status: status,
      });

      data[0].save(); // here saving the whole documnet
      res.send(data[0].books); // here send the books array from the document
    }
  });
}

module.exports = updatebooksHandler;
