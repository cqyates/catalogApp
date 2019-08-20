const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');

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
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if(user) {
               return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r:'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            });
            
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);
            
            await user.save();

            //Return jsonwebtoken come back later

        
            res.send('user registered');
        } catch(err) {
             console.error(err.message);
             res.status(500).send('Server Error')
        }

        
        

    }
);

module.exports = router;