const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authUser = require("../../auth");
const { authRole } = require("../../roleAuth");

// Load model
const User = require("../../models/User");

// @route GET api/users/test
router.get("/test", (req, res) => res.send("user test!"));

// @route GET admin page
router.get("/admin", authUser, authRole("ROLE.ADMIN"), (req, res) =>
  res.send("admin page")
);

// @route get api/users/
router.get("/", authUser, (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ nousersfound: "No users found" }));
});

// @route POST to /users
// register a new user to DB
router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      role: req.body.role,
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
    return res.status(400).send({ message: "username not found" });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          username: user.username,
          userId: user._id,
          role: user.role,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
      res.send({
        message: "Login Successful",
        username: user.username,
        userId: user._id,
        role: user.role,
        token,
      });
    } else {
      res.send("incorrect password");
    }
  } catch {
    res.status(500).send();
  }
});
module.exports = router;
