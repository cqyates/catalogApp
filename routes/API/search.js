const express = require('express');
const router = express.Router();

//@route GET api/search
//@desc test route
//@access Public
router.get('/', (req, res) => res.send('search route'));

module.exports = router;