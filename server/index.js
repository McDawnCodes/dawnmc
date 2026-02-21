const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

app.get("/api/modpacks", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./modpacks.json"));
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));