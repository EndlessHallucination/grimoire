const express = require("express");
const app = express.Router();
const db = require("../db");

app.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { attempt } = req.body;

    const snippet = db
      .prepare(
        `
        SELECT *
        FROM snippets
        WHERE id = ?
    `,
      )
      .get(id);

    if (!snippet) {
      return res.status(404).json({
        error: "Snippet not found",
      });
    }

    const prompt = `
        You are evaluating a coding exercise.

        Explanation:
        ${snippet.explanation}

        Reference solution:
        ${snippet.code}

        User attempt:
        ${attempt}

        You must compare the user's attempt with the reference solution.

        Return ONLY valid JSON.

        Do not include any explanation, markdown, or extra text.

        Your response MUST match this exact schema:

        {
            "match": boolean,
            "hint": string
        }

        Rules:
        - "match" is true only if the solution is correct or functionally equivalent.
        - "hint" should be a short clue explaining what is wrong OR "correct" if match is true.
        - Do NOT include any other keys.
        - Do NOT write any prose outside JSON.
    `;

    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: prompt,
        format: "json",
        stream: false,
      }),
    });

    const data = await ollamaRes.json();
    const evaluation = JSON.parse(data.response);

    res.json({
      snippet,
      evaluation,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = app;
