const User = require('../models/user');


module.exports.profile = function(req,res){
    res.end('<h1> Profile </h1>')
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:'Socio|signIn'
    })
};
module.exports.signup= function(req,res){
    return res.render('user_sign_up',{
        title:'Socio|signUp'
    })
};

//for getting signup data
    module.exports.create = function(req,res){
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
       User.findOne({email:req.body.email},function(err,user){
           if(err){console.log('ERROR ');return}

           if(!user){
               User.create(req.body,function(err,user){
                if(err){console.log('ERROR ');return}
                console.log('succesc');
                return res.redirect('/users/sign-in');
               });
           }else{
               console.log('error last')
               return res.redirect('back');
           }
       });

    }
//for createing a session
module.exports.createSession = function(req,res){
    //TODO
}