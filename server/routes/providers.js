const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { getProviderWithUserName, addProvider, checkId } = require('../util/providerHelpers');

//api routes for providers

module.exports = (db) => {
  //route to check if provider exists
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({message:"Login as a provider to apply"});
    }
    checkId(id,db)
      .then(res => {
        if (res) {
          res.status(200).json({message:"Verified Provider"});
        } else {
          res.status(400).json({message:"Login as a provider to apply"});
        }
      })
      .catch(e => e);
    /*const provider = providers.find(u => u.id === parseInt(req.params.id));
    if (!provider) {
      res.status(404).send("Login as a provider");
    }
    res.send(provider);*/
  });


  //registration route
  router.post('/register', async(req, res) => {
    const { prefix, firstName, lastName, userName, email, degree, aboutMe, therapy, age, ethnicity, location, profile_photo_url } = req.body;
    const salt = await bcrypt.genSalt(12);
    let { password } = req.body;
    password = await bcrypt.hash(password, salt);
  
    if (!firstName || !lastName || !userName || !email || !password) {
      res.send(400).json({ message : "You are missing a field" });
      return;
    }
    const providerData = { prefix,firstName,lastName,userName,email,password,degree,aboutMe,therapy,age,ethnicity,location,profile_photo_url };
    getProviderWithUserName(userName, db)
      .then(response => {
        if (response) {
          res.sendStatus(400).json({message:"User already exists"});
        }
        addProvider(providerData, db).then(newUser => {
          const payload = {
            user:{
              id:newUser.id,
              userName:newUser.username,
              type:"provider"
            }
          };

          //jwt token
          jwt.sign(
            payload,
            "allforlife",
            {expiresIn: 3600 * 24 },
            (err, token) => {
              if (err) {
                throw err;
              } else {
                res.json({token});
              }
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
  router.post('/login', (req, res) => {
    const {userName, password} = req.body;
    getProviderWithUserName(userName, db)
      .then(user => {
        if (!user) {
          res.status(400).json({message:"User doesn't exist!"});
        } else if (!bcrypt.compareSync(password, user['password'])) {
          res.status(400).json({message:"Password is incorrect. Try Again!"});
        } else {
          const payload = {
            user:{
              id:user.id,
              userName:user.username,
              type:"provider"
            }
          };
          jwt.sign(
            payload,
            "allforlife",
            {expiresIn: 3600 * 24 },
            (err, token) => {
              if (err) {
                throw err;
              } else {
                res.json({token});
              }
            }
          );
        }
      })
      .catch(e => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  });
  
  return router;
};

