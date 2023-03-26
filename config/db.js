const mongoose = require("mongoose");

function runDB() {
  mongoose.connect("mongodb://127.0.0.1/react-shopping-cart", {
    useNewUrlParser: true,
  })
    .then((result) => {
      console.log("connection");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = runDB;
