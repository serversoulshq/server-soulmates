
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new sqlite3.Database("database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    gender TEXT,
    preference TEXT
  )
`);

app.post("/submit", (req, res) => {
  const { name, gender, preference } = req.body;

  db.run(
    "INSERT INTO users (name, gender, preference) VALUES (?, ?, ?)",
    [name, gender, preference],
    () => {
      res.send("💖 You are in the soulmate pool 💖");
    }
  );
});

app.get("/match", (req, res) => {
  db.all("SELECT * FROM users", (err, users) => {
    if (users.length < 2) {
      res.send("Not enough soulmates yet 💔");
      return;
    }

    const shuffled = users.sort(() => 0.5 - Math.random());
    const pair = shuffled.slice(0, 2);

    res.send(`💘 Match found 💘<br><br>${pair[0].name} ♡ ${pair[1].name}`);
  });
});

app.listen(PORT, () => {
  console.log("server ♡ soulmates is running");
});
