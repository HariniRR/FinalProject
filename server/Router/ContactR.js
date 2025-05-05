const express = require('express');
const router = express.Router();
const contactController = require('../Controller/ContactC');

router.get('/', contactController.getContact);
router.post('/submit', contactController.submitContact);
router.delete("/delete/:id", contactController.deleteContact);

module.exports = router;