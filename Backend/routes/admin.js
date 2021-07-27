var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Product = require('../models/product.model');

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

// POST /api/v1/admin/products
router.post('/products', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "invalid token", "error": err});
        }
        else if(data.user.role == 'normal'){
            res.status(403).json({"message": "user is not admin"});
        }
        else {
            var product = new Product({
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                discountPrice: req.body.discountPrice,
                description: req.body.description,
                image: req.body.image
            });
            Product.create(product, (err) => {
                if(err) { 
                  res.status(400).json({"message": "cannot add product", "error": err}); 
                } else{
                  res.status(201).json({
                    "status": "success",
                    "message": "product added successfully"
                  })
                }
            })
        }
    })
  });

// DELETE /api/v1/admin/products/:id
router.delete('/products/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "invalid token", "error": err});
        }
        else if(data.user.role == 'normal'){
            res.status(403).json({"message": "user is not admin"});
        }
        else {
            
            Product.findByIdAndRemove(req.params.id, (err) => {
                if(err) { 
                  res.status(400).json({"message": "cannot delete product", "error": err}); 
                } else{
                  res.status(201).json({
                    "status": "success",
                    "message": "product deleted successfully"
                  })
                }
            })
        }
    })
});

// PUT /api/v1/admin/products/:id
router.put('/products/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.status(403).json({"message": "invalid token"});
        }
        else if(data.user.role == 'normal'){
            res.status(403).json({"message": "user is not admin"});
        }
        else {
            Product.findByIdAndUpdate(req.params.id, req.body, (err) => {
                if(err) { 
                  res.status(400).json({"message": "cannot update product", "error": err}); 
                } else{
                  res.status(201).json({
                    "status": "success",
                    "message": "product updated successfully"
                  })
                }
            })
        }
    })
});
module.exports = router;