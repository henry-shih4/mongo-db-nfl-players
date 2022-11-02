const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const playerRoutes = require("./routes/api/players");
const userRoutes = require("./routes/api/users");
connectDB();
const auth = require("./auth");

app.use(express.json({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => res.send("Hello world!"));

app.use("/api/players", auth, playerRoutes);
app.use("/users", userRoutes);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
