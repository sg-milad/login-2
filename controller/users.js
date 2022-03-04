const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Users = require("../model/userschema");
const { validationResult } = require("express-validator");
exports.home = (req, res) => {
  res.send("home");
};
exports.register = async (req, res) => {
  try {
    const users = await Users.findOne({ username: req.body.username });
    if (users) {
      return res.json("user ex");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    }).then(res.status(201).json("creat suc"));
    console.log(user);
  } catch (e) {
    console.log(e);
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });
  console.log(req.body);
  const ismatch = await bcrypt.compareSync(password, user.password);
  console.log(ismatch);

  if (ismatch && username == user.username) {
    res.redirect("/");
  }
  if (username !== user.username || !ismatch) {
    res.json("username or password wrang");
  }
};
