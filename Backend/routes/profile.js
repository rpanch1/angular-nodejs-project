var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();


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
        res.status(403).send('invalid token');
    }
}

// POST /api/v1/profile
router.post('/', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).send('invalid token');
        }
        else {
            res.json({
                "status": "success",
                "profile": data.user
            })
        }
    })
});



module.exports = router;