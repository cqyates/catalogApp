const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route  POST api/posts
// @desc   create a post
// @access Private
router.post(
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

// @route  GET api/posts
// @desc   get all posts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/posts/:id
// @desc   get post by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).sort({ date: -1 });
        res.json(post);

        if(!post) {
            return res.status(404).json({ msg: 'Post Not Found' });
        }
        
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post Not Found' });
        }
        
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/posts/:id
// @desc   Delete a post
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: 'Post Not Found' });
        }
        //check user
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json ({ msg: 'User not authorized'})
        }

        await post.remove();

        res.json({ msg: 'Post Removed'});
        
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post Not Found' });
        }
        res.status(500).send('Server Error');
    }
});
module.exports = router;