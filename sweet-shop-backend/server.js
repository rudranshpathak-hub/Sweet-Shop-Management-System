const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "secretkey";

// ---------- DATABASE ----------
const db = new sqlite3.Database("./sweetshop.db", (err) => {
  if (err) console.error(err.message);
  else console.log("✅ SQLite database connected");
});

// Create tables
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS sweets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    price REAL,
    quantity INTEGER
  )
`);

// ---------- AUTH ----------
app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashed],
    (err) => {
      if (err) return res.status(400).json({ error: "User exists" });
      res.json({ message: "User registered" });
    }
  );
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token });
    }
  );
});

// ---------- SWEETS ----------
app.post("/api/sweets", (req, res) => {
  const { name, category, price, quantity } = req.body;

  db.run(
    "INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)",
    [name, category, price, quantity],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(400).json({ error: "Failed to add sweet" });
      }
      res.json({ id: this.lastID });
    }
  );
});


app.get("/api/sweets", (req, res) => {
  db.all("SELECT * FROM sweets", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/api/sweets/:id/purchase", (req, res) => {
  const id = req.params.id;

  db.run(
    "UPDATE sweets SET quantity = quantity - 1 WHERE id = ? AND quantity > 0",
    [id],
    function () {
      if (this.changes === 0)
        return res.status(400).json({ error: "Out of stock" });

      res.json({ message: "Purchased" });
    }
  );
});

// ---------- START SERVER ----------
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
