var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Order = require('../models/order.model');
var User = require('../models/user.model');


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

// GET /api/v1/orders
router.get('/', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "invalid token"});
        }
        else {
            User.findById({_id: data.user._id}, (err, user) => {
                if(err){
                    res.status(403).json({"message": "user not found"});
                }else{
                    Order.find((err, orders) => {
                        var userOrders = orders.filter((order) => order.user.userid == user._id);
                        res.json({ "status": "success", "orders": userOrders })
                    })
                }
            })
        }
    })
});

// GET /api/v1/orders/all
router.get('/all', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "invalid token"});
        }
        else {
            User.findById({_id: data.user._id}, (err, user) => {
                if(err){
                    res.status(403).json({"message": "user not found"});
                }else{
                    Order.find((err, orders) => {
                        res.json({ "status": "success", "orders": orders })
                    })
                }
            })
        }
    })
});

// PUT /api/v1/orders/:id
router.put('/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "invalid token"});
        }
        else if(data.user.role == 'normal'){
            res.status(403).json({"message": "user is not admin"});
        }
        else {
            Order.findByIdAndUpdate(req.params.id, req.body, (err) => {
                if(err) { 
                  res.status(400).json({"message": "cannot update order", "error": err}); 
                } else{
                  res.status(201).json({
                    "status": "success",
                    "message": "order modified successfully"
                  })
                }
            })
        }
    })
});


// DELETE /api/v1/orders/:id
router.delete('/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "invalid token"});
        }
        else if(data.user.role == 'normal'){
            res.status(403).json({"message": "user is not admin"});
        }
        else {
            Order.findByIdAndRemove(req.params.id, req.body, (err) => {
                if(err) { 
                  res.status(400).json({"message": "cannot delete order", "error": err}); 
                } else{
                  res.status(201).json({
                    "status": "success",
                    "message": "order deleted successfully"
                  })
                }
            })
        }
    })
});

module.exports = router;