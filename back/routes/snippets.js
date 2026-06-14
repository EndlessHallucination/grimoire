const express = require("express");
const app = express.Router();
const db = require("../db");

app.post("/", (req, res) => {
  const { name, code, explanation, tags } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const insertSnippet = db.prepare(
      `INSERT INTO snippets (name, code, explanation) VALUES (?, ?, ?)`,
    );
    const snippet = insertSnippet.run(name, code, explanation);
    const snippetId = snippet.lastInsertRowid;

    tags.forEach((tag) => {
      const insertTag = db.prepare(
        `INSERT or IGNORE INTO tags (name) VALUES (?)`,
      );
      const insertedTag = insertTag.run(tag);

      const tagId = db.prepare(`SELECT id FROM tags WHERE name = ?`).get(tag);

      const fillSnippetTag = db.prepare(
        `INSERT or IGNORE INTO snippet_tags (snippet_id, tag_id) VALUES (?, ?)`,
      );

      const snippetTag = fillSnippetTag.run(snippetId, tagId.id);
    });

    res.status(201).json({
      message: "Snippet saved to database successfully",
      id: snippet.lastInsertRowid,
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({ error: "Already exists in the database." });
    }
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

module.exports = app;
