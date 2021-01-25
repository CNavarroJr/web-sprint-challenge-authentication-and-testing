const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authError = {
    Message: "Invalid credentials"
  }

  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json(authError)
    }

    jwt.verify(token, "secret code", (err, decoded) => {
      if (err) {
        return res.status(401).json(authError)
      }
      req.token = decoded;
      next();
    })
    
  } catch (err) {
    next(err);
  }
};
