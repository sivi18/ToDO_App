const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5001;
const router = require("./routes/TodoRoutes");
const ConnectionDb = require("./config/Dbconnection");
ConnectionDb();
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Express Started");
});
app.listen(PORT, (req, res) => {
  console.log(`Server Connected on PORT ${PORT}`);
});
