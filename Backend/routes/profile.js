var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
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

// POST /api/v1/profile
router.post('/', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "invalid token"});
        }
        else {
            res.json({
                "status": "success",
                "profile": data.user
            })
        }
    })
});

// DELETE /api/v1/profile/image
router.delete('/image', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "invalid token"});
        }
        else {
            User.findOneAndUpdate(data.user._id, {image: ''}, (err) => {
                if(err){
                    res.status(400).json({"message": "could not delete profile image"});
                }else {
                    res.json({
                        "status": "success",
                        "message": "profile image deleted successfully"
                    })
                }
            })
        }
    })
});

// PUT /api/v1/profile/image
router.put('/image', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "invalid token"});
        }
        else {
            User.findOneAndUpdate(data.user._id, req.body, (err) => {
                if(err){
                    res.status(400).json({"message": "could not update profile image"});
                }else {
                    res.json({
                        "status": "success",
                        "message": "profile image updated successfully"
                    })
                }
            })
        }
    })
});

// PUT /api/v1/profile/address
router.put('/address', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "invalid token"});
        }
        else {
            User.findOneAndUpdate(data.user._id, req.body, (err) => {
                if(err){
                    res.status(400).json({"message": "could not update address"});
                }else {
                    res.json({
                        "status": "success",
                        "message": "profile updated successfully"
                    })
                }
            })
        }
    })
});

module.exports = router;