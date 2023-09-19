const jwt = require("jsonwebtoken")
//const config = require("config")
//const User = require("../models/User")


module.exports = function (req, res, next) {
  
  
    const token = req.cookies.jwt;
    console.log(token)
 
   /* if (token) {
      try {
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded?.user; // Use optional chaining operator
        next();
      } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }*/
  
  
    //const token = req.header("x-auth-token");
  //console.log(token)
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
