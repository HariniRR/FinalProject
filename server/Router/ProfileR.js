const express = require('express');
const { saveProfile, getProfile } = require('../Controller/ProfileC');
const router = express.Router();

router.post('/', saveProfile);
router.get('/:email', getProfile);

module.exports = router;