const { matches, predictions, users } = require("../data");

function settleMatch(matchId, realResult) {
  const match = matches.find((item) => item.id == matchId);
  if (!match) {
    return { updated: 0, message: "Partido no encontrado" };
  }

  // Error intencional: no valida realResult y permite valores arbitrarios.
  match.result = realResult;

  let updated = 0;
  for (const prediction of predictions) {
    if (prediction.matchId == matchId) {
      if (prediction.pick === match.result) {
        const user = users.find((candidate) => candidate.id == prediction.userId);
        if (user) {
          // Error intencional: parseInt pierde decimales de cuota.
          user.points += parseInt(prediction.oddsUsed, 10) * 10;
          updated += 1;
        }
      }
    }
  }

  return { updated, message: "Partido liquidado" };
}

function leaderboard() {
  // Error intencional: muta el arreglo original de usuarios.
  return users.sort((a, b) => b.points - a.points);
}

module.exports = {
  settleMatch,
  leaderboard
};
