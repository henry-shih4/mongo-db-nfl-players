const express = require("express");
const router = express.Router();
const { authRole } = require("../../roleAuth");

// Load Player model
const Player = require("../../models/Player");

// @route GET api/players/test
// @description tests books route
// @access Public
router.get("/test", authRole("ROLE.ADMIN"), (req, res) =>
  res.send("player admin route testing!")
);

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req, res) => {
  Player.find()
    .then((players) => res.json(players))
    .catch((err) =>
      res.status(404).json({ noplayersfound: "No Players found" })
    );
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", (req, res) => {
  Player.findById(req.params.id)
    .then((player) => res.json(player))
    .catch((err) => res.status(404).json({ nobookfound: "No Player found" }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post("/", authRole("ROLE.ADMIN"), (req, res) => {
  Player.create(req.body)
    .then((player) => res.json({ msg: "Player added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this player" })
    );
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put("/:id", authRole("ROLE.ADMIN"), (req, res) => {
  Player.findByIdAndUpdate(req.params.id, req.body)
    .then((player) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", authRole("ROLE.ADMIN"), (req, res) => {
  Player.findByIdAndRemove(req.params.id, req.body)
    .then((player) => res.json({ msg: "Player entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such player" }));
});

module.exports = router;
