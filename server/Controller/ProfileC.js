const Profile = require('../Model/ProfileM');

// Create or update profile
exports.saveProfile = async (req, res) => {
  try {
    const { email } = req.body; // Assuming email is unique for each user
    const profile = await Profile.findOneAndUpdate({ email }, req.body, { new: true, upsert: true });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error saving profile', error });
  }
};

// Get profile by email
exports.getProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};