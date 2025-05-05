const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullname: String,
  nickname: String,
  email: String,
  contact: String,
  gender: String,
  dob: Date,
  profession: String,
  interests: String,
  bio: String,
  picture: String,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;