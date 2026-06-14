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

app.get("/", (req, res) => {
  try {
    const rows = db
      .prepare(
        `
      SELECT snippets.name AS snippet_name,
      snippets.explanation AS snippet_explanation,
      snippets.code AS snippet_code,
      snippet_tags.snippet_id, snippet_tags.tag_id,
      tags.name AS tag_name FROM snippet_tags 
      INNER JOIN snippets ON snippet_tags.snippet_id = snippets.id 
      INNER JOIN tags ON snippet_tags.tag_id = tags.id;
      `,
      )
      .all();

    const snippetsMap = {};

    rows.forEach((r) => {
      if (!snippetsMap[r.snippet_id]) {
        snippetsMap[r.snippet_id] = {
          id: r.snippet_id,
          name: r.snippet_name,
          code: r.snippet_code,
          explanation: r.snippet_explanation,
          tags: [r.tag_name],
        };
      } else {
        snippetsMap[r.snippet_id].tags.push(r.tag_name);
      }
    });
    const snippetsArr = Object.values(snippetsMap);
    res.status(201).json({
      message: "Snippet returned successfully",
      data: snippetsArr,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/:id", (req, res) => {
  try {
    const id = req.params["id"];
    const stmt = db.prepare(`
      DELETE FROM snippets WHERE id = ?
      `);
    const deleteSnippet = stmt.run(id);

    if (deleteSnippet.changes === 0) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    return res.json({ success: true, message: "Snippet deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
