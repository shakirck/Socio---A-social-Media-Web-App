const express = require('express');

const router = express.Router();

const friendsController = require('../controllers/friends_controller');

router.get('/toggleFriends',friendsController.toggleFriends);

module.exports = router;