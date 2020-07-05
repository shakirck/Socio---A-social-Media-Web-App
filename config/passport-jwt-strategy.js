const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;


const User = require('../models/user');

let opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'socio'

}

passport.use(new JWTstrategy(opts,function(jwtPayload , done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){console.log('error in findng use from jwt'); return;}
        

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}))


module.exports = passport;