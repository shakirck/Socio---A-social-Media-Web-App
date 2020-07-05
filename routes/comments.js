var express  = require('express');
const passport = require('passport');
var router = express.Router();

const commenteController = require('../controllers/comments_controller');


router.post('/create',passport.checkAuthentication,commenteController.create);
router.get('/destroy/:id',passport.checkAuthentication,commenteController.destroy);
module.exports = router;