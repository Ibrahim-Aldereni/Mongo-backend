const MongooseItems = require("./mongoose-books"); // this one is object cuz i export two things from mongoose-books

function addbooksHandler(req, res) {
  const { email, name, desc, status } = req.body;

  MongooseItems.Owners.find({ email: email }, (err, data) => {
    if (err) {
      res.status(500).send("there is error");
    } else {
      data[0].books.push({
        name: name,
        desc: desc,
        status: status,
      });

      // console.log(data[0]);
      data[0].save();
      res.send(data[0].books);
    }
  });
}

module.exports = addbooksHandler;
