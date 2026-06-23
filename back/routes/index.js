const express = require("express");
const router = express.Router();
const snippetRoutes = require("./snippets");
const quizRoutes = require("./quiz");

router.use("/snippets", snippetRoutes);
router.use("/quiz", quizRoutes);

router.get("/", (req, res) => {
  res.json({ message: "API routes folder connected successfully" });
});

module.exports = router;
