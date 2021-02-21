const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { getUserWithUserName, addUser } = require('../util/customerHelpers');

//api routes

module.exports = (db) => {
  //registration routes
  router.post('/register', async(req, res) => {
    const { prefix, firstName, lastName, userName, email } = req.body;
    let { password } = req.body;
    const salt = await bcrypt.genSalt(12);
    password = await bcrypt.hash(password, salt);
    if (!firstName || !lastName || !userName || !email || !password) {
      res.status(400).json({message:"You are missing a field"});
    }
    const userData = {
      prefix,
      firstName,
      lastName,
      userName,
      email,
      password
    };

    getUserWithUserName(userName, db)
      .then(response => {
        if (response) {
          res.status(400).json({message:"user exist"});
        }
        addUser(userData, db).then(newUser => {
          const payload = {
            user: {
              id: newUser.id,
              userName: newUser.username,
              type:'customer'
            }
          };
          //res.json(payload);
          jwt.sign(
            payload, 
            "allforlife",
            {expiresIn: 3600 * 24},
            (err, token) => {
              if (err) {
                throw err;
              }
              res.json({token});
            }
          );
        })
          .catch(e => res.send("error"));
          
      })
      .catch(e => {
        res.status(500).json({ error: e.message});
      });
  });
  
  //login route
  router.post('/login',(req, res) => {
    const {userName, password} = req.body;
    getUserWithUserName(userName, db)
      .then(loggedUser => {
        if (!loggedUser) {
          res.status(400).json({message:"Username does not exit"});
        } else if (!bcrypt.compareSync(password, loggedUser['password'])) {
          res.status(400).json({message:"Password is incorrect"});
        }
        //payload
        const payload = {
          user: {
            id: loggedUser.id,
            userName: loggedUser.username,
            type:'customer'
          }
        };
        //sending tokens
        jwt.sign(
          payload, 
          "allforlife",
          {expiresIn: 3600 * 24},
          (err, token) => {
            if (err) {
              throw err;
            }
            res.cookie("session", loggedUser.id, {withCredentials: true});
            res.json({token});
            
          }
        );
      })
      .catch(e => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  });

  router.get('/', (req, res) => {
   
    res.cookie('cookie', '123', {withCredentials: true})
    res.cookie('man', '123');
    res.send('home');
  });
  return router;
};