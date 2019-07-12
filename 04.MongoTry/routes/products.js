const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(result => {
            res.status(200).json({
                status: 1,
                message: 'Products found',
                content: {
                    products: result
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 0,
                message: 'Something went wrong',
                content: {
                    error: err
                }
            })
        })
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        res.status(200).json({
            status: 1,
            message: 'Product added',
            content: {
                product: product
            }
        })
    }).catch(err => {
        res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            content: {
                error: err
            }
        })
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(result => {
            res.status(200).json({
                status: 1,
                message: 'Item found',
                content: {
                    product: result
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 0,
                message: 'Item not found',
                content: {
                    error: err
                }
            })
        })
});

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;