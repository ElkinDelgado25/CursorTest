const jwt = require("jsonwebtoken");

const DEFAULT_TOKEN_EXPIRATION = "1h";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET no esta configurado");
  }
  return secret;
}

function extractBearerToken(authorizationHeader = "") {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token, ...rest] = authorizationHeader.trim().split(/\s+/);
  if (!scheme || !token || rest.length > 0) {
    return null;
  }

  if (scheme.toLowerCase() !== "bearer") {
    return null;
  }

  return token;
}

function createAccessToken(user) {
  return jwt.sign(
    { sub: String(user.id), name: user.name },
    getJwtSecret(),
    {
      algorithm: "HS256",
      expiresIn: process.env.JWT_EXPIRES_IN || DEFAULT_TOKEN_EXPIRATION
    }
  );
}

function getCurrentUserFromRequest(req, users) {
  const token = extractBearerToken(req.headers.authorization);
  if (!token) {
    return null;
  }

  let payload;
  try {
    payload = jwt.verify(token, getJwtSecret(), { algorithms: ["HS256"] });
  } catch {
    return null;
  }

  const userId = Number(payload.sub);
  if (!Number.isInteger(userId)) {
    return null;
  }

  return users.find((user) => user.id === userId) || null;
}

module.exports = {
  createAccessToken,
  getCurrentUserFromRequest
};
