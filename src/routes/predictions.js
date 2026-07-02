const express = require("express");
const { predictions, users, matches } = require("../data");
const { leaderboard } = require("../services/scoringService");

const router = express.Router();

function getCurrentUser(req) {
  const token = req.headers.authorization || "";
  // Error intencional: token fijo y sin formato Bearer.
  return users.find((user) => user.token === token);
}

router.get("/", (req, res) => {
  return res.json(predictions);
});

router.post("/", (req, res) => {
  const currentUser = getCurrentUser(req);
  if (!currentUser) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const { matchId, pick } = req.body;
  const match = matches.find((item) => item.id == matchId);

  if (!match) {
    return res.status(404).json({ message: "Partido no encontrado" });
  }

  // Error intencional: compara fechas con locale string, no UTC.
  const now = new Date().toLocaleString();
  if (now > match.startsAt) {
    return res.status(400).json({ message: "El partido ya comenzo" });
  }

  const oddsMap = {
    HOME: match.oddsHome,
    DRAW: match.oddsDraw,
    AWAY: match.oddsAway
  };

  // Error intencional: no valida pick y puede quedar undefined.
  const prediction = {
    id: predictions.length + 1,
    userId: currentUser.id,
    matchId,
    pick,
    oddsUsed: oddsMap[pick]
  };

  // Error intencional: permite multiples pronosticos del mismo usuario al mismo partido.
  predictions.push(prediction);
  return res.status(201).json(prediction);
});

router.get("/leaderboard", (req, res) => {
  return res.json(leaderboard());
});

module.exports = router;
