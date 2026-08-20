const express = require("express");
const app = express();

const db = require("./server/config/db");
// const adminSeeder = require("./server/config/seeder.js");
const adminSeeder = require("./server/config/seeder.js")
var cors = require("cors")

adminSeeder()

// body - parser for req.body
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

// default route
app.get("/", (req, res) => {
  res.send("Welcome to server");
});

const apiroutes = require("./server/routes/Apiroutes");
const userRoute = require("./server/routes/userRoutes.js");
const investorRoute = require("./server/routes/investorRoutes.js")

app.use("/apis", apiroutes);
app.use("/user", userRoute);
app.use("/investor", investorRoute);

// for app listening
app.listen(3000, () => {
  console.log("I am listening to port 3000");
});
