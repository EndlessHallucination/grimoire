const express = require("express");
const router = express.Router();
const snippetRoutes = require("./snippets");


router.use("/snippets", snippetRoutes);


router.get("/", (req, res) => {
  res.json({ message: "API routes folder connected successfully" });
});

module.exports = router;
