const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const { getUserWithUserName, addUser } = require('../util/customerHelpers');

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
  router.post('/register', (req, res) => {
    const { prefix, firstName, lastName, userName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
  
    if (!firstName || !lastName ||!userName ||!email || !password) {
      res.send("You are missing a field");
      return;
    }
    const userData = {
      prefix: prefix,
      firstName: firstName,
      lastName:lastName,
      userName:userName,
      email:email,
      password: hashedPassword
    };
    getUserWithUserName(userName, db)
      .then(response => {
        if (response) {
          res.json([]);
          return;
        }
        addUser(userData, db).then(newUser => {
          req.session.customerId = newUser .id;
          console.log(req.session.customerId, "user");
          req.session.customerId=newUser .id;
          console.log(req.session.customerId)
          res.json(newUser);
          return;
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
          res.json([]);
        } else if (!bcrypt.compareSync(password, user['password'])) {
          res.json([]);
          return;
        }
        req.session.customerId = user.id;
        console.log(req.session.customerId);
        req.session.customerId=user.id;
        console.log(req.session.customerId)
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

