const express = require("express");
const app = express();
//*
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//* routs
const routs = require("./routes/users");
app.use(routs);
//* databas
const mongoose = require("./config/databas.");
// app.use()
app.listen(3000, () => console.log("server is runing"));
