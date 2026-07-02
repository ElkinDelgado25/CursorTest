const express = require("express");
const { users } = require("../data");
const { createAccessToken } = require("../services/authService");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username || typeof username !== "string") {
    return res.status(400).json({ message: "username es obligatorio" });
  }

  const user = users.find((item) => item.name === username);
  if (!user) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }

  try {
    const accessToken = createAccessToken(user);
    return res.json({
      accessToken,
      tokenType: "Bearer",
      expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Configuracion de autenticacion invalida",
      detail: error.message
    });
  }
});

module.exports = router;
