var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Order = require('../models/order.model');

// Used for getting the token from the Header
const verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if(typeof bearerHeader != 'undefined'){
        // split at space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        next();
    }else {
        res.status(403).json({"message": "invalid token"});
    }
}

// POST /api/v1/checkout
router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "cannot verify token"});
        }
        else {
            var order = new Order({
                user: req.body.user,
                cart: req.body.cart
            })
            Order.create(order, (err) => {
                if(err) { 
                  res.status(400).json({"message": "cannot place order", "error": err}); 
                } else{
                  res.status(201).json({
                    "status": "success",
                    "message": "order placed successfully"
                  })
                }
            })
        }
    })
});

module.exports = router;