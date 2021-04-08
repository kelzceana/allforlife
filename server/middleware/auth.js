const jwt = require('jsonwebtoken');
const config = require('../config/keys');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  //check if jw token exist and is verified
  if (!token) {
    return res
      .status(401)
      .json({message: "authentication failed"});
  }

  try {
    const verifiedToken = jwt.verify(token, config.jwtSecret);
    req.user = verifiedToken.user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({message: "authentication failed"});
  }
};
