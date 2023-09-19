const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
  
  
    const token = req.cookies.jwt;
    console.log(token)
  if (!token)
    return res
      .status(401)
      .send({ status: false, message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.payload = decoded;

    next();
  } catch (exc) {
    res.status(400).send({ status: false, message: "Invalid token." });
  }
  
};
