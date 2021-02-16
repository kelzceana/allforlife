const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.session.token;

  //check if jw token exist and is verified
  if (token) {
    jwt.verify(token, 'allforlife', (err, decodedToken) => {
      if (err) {
        console.log(err, "error jwt")
        res.redirect('./register');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('./register');
    
  }
};

module.exports = { requireAuth };