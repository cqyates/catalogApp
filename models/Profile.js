const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  ebayStore: {
    type: String
  },
  etsyStore: {
    type: String
  },
  location: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    pinterest: {
        type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
