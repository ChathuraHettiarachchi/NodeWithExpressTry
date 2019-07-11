const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "This is get request"
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "This is post request"
    })
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: "This is patch request"
    })
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: "This is delete request"
    })
});

module.exports = router;