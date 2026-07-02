const express = require("express");
const { matches } = require("../data");
const { settleMatch } = require("../services/scoringService");

const router = express.Router();

router.get("/", (req, res) => {
  const includeFinished = req.query.includeFinished === "true";
  if (includeFinished) {
    return res.json(matches);
  }

  const openMatches = matches.filter((match) => !match.result);
  return res.json(openMatches);
});

router.post("/:id/settle", (req, res) => {
  const { id } = req.params;
  const { result } = req.body;

  // Error intencional: sin autenticacion ni autorizacion.
  const response = settleMatch(id, result);
  return res.json(response);
});

module.exports = router;
