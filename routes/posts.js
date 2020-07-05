var express  = require('express');
const passport = require('passport');
var router = express.Router();

const postsController = require('../controllers/posts_controller');

router.get('/view',postsController.view);
router.post('/create',passport.checkAuthentication,postsController.create);
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);


module.exports = router;