const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
    .get(protect, () => {
        console.log('hello you entered our site successfully');
    })


module.exports = router;