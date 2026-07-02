const matches = [
  { id: 1, home: "Barcelona", away: "Real Madrid", startsAt: "2026-07-15T18:00:00Z", oddsHome: 1.95, oddsDraw: 3.2, oddsAway: 2.1, result: null },
  { id: 2, home: "Boca Juniors", away: "River Plate", startsAt: "2026-07-18T20:00:00Z", oddsHome: 2.3, oddsDraw: 3.1, oddsAway: 2.4, result: null },
  { id: 3, home: "Manchester City", away: "Liverpool", startsAt: "2026-07-20T17:30:00Z", oddsHome: 1.8, oddsDraw: 3.5, oddsAway: 2.6, result: "HOME" }
];

const predictions = [];
const users = [
  { id: 1, name: "ana", points: 0, token: "token-ana-fijo" },
  { id: 2, name: "luis", points: 0, token: "token-luis-fijo" }
];

module.exports = {
  matches,
  predictions,
  users
};
