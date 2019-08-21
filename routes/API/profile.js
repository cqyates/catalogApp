const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile/me
//@desc Get current users profile
//@access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
    } catch (err) {
        onsole.error(err.message);
        res.status(500).send('Server Error');

    }
});

//@route POST api/profile
//@desc Create or update a user profile
//@access Private
router.post('/', auth, async (req, res) => {
    const {
        company,
        website,
        location,
        youtube,
        facebook,
        twitter,
        instagram,
        pinterest
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (pinterest) profileFields.social.pinterest = pinterest;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            //update 
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile);
        }
        //create
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
}
);

module.exports = router;