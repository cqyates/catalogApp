const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

//@route GET api/posts
//@desc test route
//@access Public
router.get(
    '/',
    [
        auth,
        [
            check('text', 'No Empty Posts')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const User = await User.findById(req.user.id).select('-password');

            const newPost = new Post ({
                text: req.body.text,
                user: user.name,
                avatar: user.avatar,
                user: req.user.id
            });

            const post = await newPost.save();

            res.json(post);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }
    }

);

module.exports = router;