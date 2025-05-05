// Routers/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controller/RegUserC');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/logout', userController.logout);
router.get('/user', userController.getLoggedInUser );
router.get('/', userController.getAllUsers); 
router.put('/:id', userController.updateUser ); 
router.delete('/:id', userController.deleteUser ); 

module.exports = router;