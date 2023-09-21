import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./my-database.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product INTEGER NOT NULL,
      key TEXT NOT NULL,
      quantity INTEGER NOT NULL
    )
  `);
});

export default db;
