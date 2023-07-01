const express = require("express");
const router = require("./Utils/router");
const moongose = require("mongoose");
require("dotenv").config();

const mongoConnectionURI = process.env.MONGO_URI;
const app = express();

moongose.connect(mongoConnectionURI);

const db = moongose.connection;
db.on("error", console.error.bind(console, "Erro de conexão:"));
db.once("open", function () {
  console.log("Connection to MongoDB established successfully!");
});

app.use(express.json());
app.use(router);

app.listen(3000, () => console.log("Server is running ok! On port 3000"));
