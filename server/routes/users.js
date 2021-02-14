const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { getUserWithUserName, addUser, checksession } = require('../util/customerHelpers');
const { requireAuth } = require("../middleware/authMiddleWare");
//api routes

module.exports = (db) => {
  //registration routes
  router.post('/register',requireAuth,  async(req, res) => {
    const { prefix, firstName, lastName, userName, email } = req.body;
    let { password } = req.body;
    //const hashedPassword = bcrypt.hashSync(password, 12);
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
              auth: requireAuth
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

          // req.session.customerId = newUser.id;
          // req.session.customerId = newUser .id;
          // res.json(newUser);
          // return;
        })
          .catch(e => res.send("error"));
          
      })
      .catch(e => {
        //res.status(500).json({ error: e.message});
      });
  });
  
  //login route
  router.post('/login',(req, res) => {
    const {userName, password} = req.body;
    getUserWithUserName(userName, db)
      .then(loggedUser => {
        if (!loggedUser) {
          res.send(401).json({message:"Username does not exit"});

        } else if (!bcrypt.compareSync(password, loggedUser['password'])) {
          res.status(400).json({message:"password is incorrect"});
          return;
        }

        //payload
        const payload = {
          user: {
            id: loggedUser.id,
            userName: loggedUser.username,
            auth: requireAuth
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
            res.json({token});
          }
        );

        // req.session.customerId = user.id;
        // console.log(req.session, "heyyeyeyeyeyeyeyey");
        // //console.log(req.session.customerId);
        // req.session.customerId = user.id;
        // res.json(user);
      })
      .catch(e => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  });
  return router;
};

