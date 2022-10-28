const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const users = [];

// Load model
const User = require("../../models/User");

// @route GET api/users/test
router.get("/test", (req, res) => res.send("user test!"));



// @route get api/users/
router.get("/", (req, res) => {
    User.find()
      .then((user) => res.json(user))
      .catch((err) =>
        res.status(404).json({ nousersfound: "No users found" })
      );
  });


  // @route POST to api/users
router.post("/", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = {username:req.body.username, password: hashedPassword, email:req.body.email}
        User.create(user)
        res.status(201).send()
    }
    catch{
        res.status(500).send()
    }
    // User.create(req.body)
    //   .then(() => res.json({ msg: "User added successfully" }))
    //   .catch((err) =>
    //     res.status(400).json({ error: "Unable to add user" })
    //   );
  });



module.exports = router;
