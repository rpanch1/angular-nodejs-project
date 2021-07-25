var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('../models/user.model');


// POST /api/v1/users/register
router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  var user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: hashedPassword,
    email: req.body.email,
    role: req.body.role
  });

  User.create(user, (err) => {
    if(err) { 
      res.status(400).json({"message": "cannot register user", "error": err}); 
    } else{
      
      res.status(201).json({
        "status": "success",
        "message": "user created successfully"
      })
    }
  })
});

// POST /api/v1/users/login
router.post('/login', (req, res) => {

  // Authenticate user email and password
  User.findOne({ email: req.body.email }, (err, user) => {
    if(user === null) { 
      res.status(400).json({"message": "invalid email"});

    } else{
      bcrypt.compare(req.body.password, user.password, (err, valid) => {
        if (err) { res.status(400).json({"message": "invalid password"})}

        if(valid){
          // If password is valid, create and send JSON Web Token
          jwt.sign({user: user}, 'secretkey', (err, token) => {
            res.json({
              "status": "success",
              "message": "user logged in successfully",
              "accessToken": token 
            })
          })
        } else {
          res.status(400).json({ "message": "invalid password" });
        }
      })
    }
  })
});



module.exports = router;
