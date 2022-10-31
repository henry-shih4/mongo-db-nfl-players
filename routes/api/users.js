const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = [
  {
    username: "ssong",
    password: "password",
  },
];

// Load model
const User = require("../../models/User");

// @route GET api/users/test
router.get("/test", (req, res) => res.send("user test!"));

// @route get api/users/
router.get("/", (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ nousersfound: "No users found" }));
});

// @route POST to api/users
// add a new user to DB
router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    };
    User.create(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
  // User.create(req.body)
  //   .then(() => res.json({ msg: "User added successfully" }))
  //   .catch((err) =>
  //     res.status(400).json({ error: "Unable to add user" })
  //   );
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user === null) {
    return res.status(400).send();
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("not allowed");
    }
  } catch {
    res.status(500).send();
  }
});
module.exports = router;
