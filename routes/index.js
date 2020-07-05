const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();

const  homeController = require('../controllers/home_controller');


console.log('Router loaded');


router.get('/',homeController.home);
router.get('/test',homeController.test);

router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

//apis
router.use('/api',require('./api'));

module.exports = router;