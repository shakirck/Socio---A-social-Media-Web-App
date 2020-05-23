var express  = require('express');

var router = express.Router();

const postsController = require('../controllers/posts_controller');

router.get('/view',postsController.posts);
module.exports = router;