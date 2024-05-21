const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

const userModel = require("./Schema/User")

const dbConfig = require("./config/database.config")
const mongoose = require("mongoose");
mongoose.connect(dbConfig.url).then(() => {
  console.log("connected successfully")
}).catch(err => {
  console.log("not connected "+ err);
  process.exit();
})


app.get("/", async (req, res) => {
  await userModel.find().then(data => {
    res.status(200).send({
      message: "Fetched the data",
      user: data
    });
  }).catch(err => {
    res.status(500).send("Error occurred: " + err); // Updated this line
  });
});

app.get("/:id", async (req, res) => {
const { id } = req.params;
  await userModel.findById(id).then(data => {
    if (!data) {
      res.status(404).send("User Not Found in the DB");
    } else {
      res.status(200).send({
        message: "data fetched according to the id",
        user: data
      });
    }
  }).catch(err => {
    res.status(500).send("Error occurred: " + err); // Updated this line
  });
});

app.patch("/:id", async (req, res) => {
if (!req.body) {
  res.status(404).send("Data is needed to update");
  return;
}

const { id } = req.params;

await userModel.findByIdAndUpdate(id, req.body, { new: true }).then(data => {
  res.status(200).send({
    message: 'updated Succesfully',
    user: data
  });
  console.log("🚀 ~ awaituserModel.findByIdAndUpdate ~ data:", data);
}).catch(err => {
  res.status(500).send("Error occurred: " + err); // Updated this line
});
});

app.delete("/:id", async (req, res) => {
const { id } = req.params;
await userModel.findByIdAndDelete(id).then(data => {
  if (!data) {
    res.status(404).send("User Not Found in the DB");
  } else {
    res.status(200).send({
      message: "User deleted successfully",
      user: data
    });
  }
}).catch(err => {
  res.status(500).send("Error occurred: " + err); // Updated this line
});
});

app.post("/add", async (req, res) => {
const { name, age, gender } = req.body;
const user = new userModel({
  name,
  age,
  gender
});
await user.save().then(data => {
  res.status(200).send({
    message: "Added Succesfully",
    user: data
  });
}).catch(err => {
  console.log("🚀 ~ awaituser.save ~ err:", err);
  res.status(400).send("Error Occurred: " + err); // Updated this line
});
});

app.listen(3001, () => {
  console.log("server is started at 3001")
});
