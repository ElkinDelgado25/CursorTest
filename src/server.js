const express = require("express");
const path = require("path");
const matchesRoutes = require("./routes/matches");
const predictionsRoutes = require("./routes/predictions");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api", (req, res) => {
  res.json({
    name: "Sports Predictions API",
    version: "1.0.0",
    endpoints: ["/matches", "/predictions", "/predictions/leaderboard"]
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use("/matches", matchesRoutes);
app.use("/predictions", predictionsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});
