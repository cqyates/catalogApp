const express = require('express');
const router = express.Router();

//@route GET api/upload
//@desc test route
//@access Public
router.get('/', (req, res) => res.send('upload route'));

module.exports = router;