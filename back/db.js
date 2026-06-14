const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const db = new Database("snippets.db", { verbose: console.log });

const sqlFilePath = path.join(__dirname, "schema.sql");

try {
  const sqlScript = fs.readFileSync(sqlFilePath, "utf8");

  db.exec(sqlScript);
  console.log("Successfully executed the .sql file.");
} catch (error) {
  console.error("Error running the .sql script:", error.message);
}

module.exports = db;
