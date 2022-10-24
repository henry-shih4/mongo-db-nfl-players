const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const playerRoutes = require("./routes/api/players");

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));

app.use("/api/players", playerRoutes);


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
