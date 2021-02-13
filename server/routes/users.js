const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { getUserWithUserName, addUser, checksession } = require('../util/customerHelpers');

//api routes

module.exports = (db) => {
  
  router.get('/', async(req, res) => {
    try {
      const allUsers = await db.query(`SELECT * FROM customers`);
      res.json(allUsers.rows);
    } catch (e) {
      console.log(e.message);
    }
  });
  
  router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      res.status(404).send("this user does not exist");
    }
    res.send(user);
  });
  
  //registration route
  router.post('/register', async(req, res) => {
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
              userName: newUser.username
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
  router.post('/login', (req, res) => {
    const {userName, password} = req.body;
    getUserWithUserName(userName, db)
      .then(user => {
        if (!user) {
          res.send(401).json({message:"Username does not exit"});

        } else if (!bcrypt.compareSync(password, user['password'])) {
          res.json([]);
          return;
        }
        req.session.customerId = user.id;
        console.log(req.session, "heyyeyeyeyeyeyeyey");
        //console.log(req.session.customerId);
        req.session.customerId = user.id;
        res.json(user);
      })
      .catch(e => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  });
  return router;
};

