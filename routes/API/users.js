const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User')

//@route GET api/users
//@desc test route
//@access Public
router.post('/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please included a valid email').isEmail(),
        check('password', 'Please enter a password with 8 or more characters')
            .isLength({ min: 6 })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        res.send('user route');

    }
);

module.exports = router;