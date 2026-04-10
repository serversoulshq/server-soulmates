const express = require("express");
const path = require("path");

const app = express();

// serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// default route → login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// dashboard route
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
