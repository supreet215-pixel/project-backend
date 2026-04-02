const express = require("express");
const app = express();

const db = require("./server/config/db");

// body - parser for req.body
app.use(express.urlencoded());
app.use(express.json());

// default route
app.get("/", (req, res) => {
  res.send("Welcome to server");
});

const apiroutes = require("./server/routes/Apiroutes");

app.use("/apis", apiroutes);

// for app listening
app.listen(3000, () => {
  console.log("I am listening to port 3000");
});
