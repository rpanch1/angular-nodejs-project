var express = require('express');
var router = express.Router();
var Product = require('../models/product.model');

// GET /api/v1/products
router.get('/', (req, res) => {
    Product.find((err, products) => {
        if(err){
            res.status(400).json({"message": "error retrieving products"})
        }else{
            res.json(products);
        }
    })
});

// GET /api/v1/products/:id
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if(err){
            res.status(400).json({"message": "error retrieving product"})
        }else{
            res.json(product);
        }
    })
});

module.exports = router;