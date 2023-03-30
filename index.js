const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb://ebrahim:123@ac-0k5qbva-shard-00-00.ionptfc.mongodb.net:27017,ac-0k5qbva-shard-00-01.ionptfc.mongodb.net:27017,ac-0k5qbva-shard-00-02.ionptfc.mongodb.net:27017/Orico-shop?ssl=true&replicaSet=atlas-pxmwai-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then((result) => console.log("connection"))
  .catch((err) => console.log(err));

const User = mongoose.model(
  "user",
  new mongoose.Schema(
    {
      fname: {
        type: String,
        required: true,
        unique: true,
      },
      lname: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

app.post("/api/userdb", async (req, res) => {
  const newProduct = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  });
  let saveProduct = await newProduct.save();
  return res.send(saveProduct);
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong credential eamil");
    }

    const password = user.password;

    if (password !== req.body.password) {
      return res.status(401).json("Wrong credential pass");
    }

    // console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/api/userdb", async (req, res) => {
  const orders = await User.find();
  return res.status(200).json(orders);
});

const port = 6000 || process.env.PORT;
app.listen(6000, () => {
  console.log("Running....");
});
