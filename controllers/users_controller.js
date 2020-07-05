const User = require('../models/user');
const path = require('path');
const fs = require('fs');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title:'Profile',
            profile_user:user

        });
    })
   
}
module.exports.update = async function(req,res){

    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('****Multer error',err);};

                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        //delete the avatar if they have already one;
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));


                    }

                    //saving  the avatar  path to the avatar path;
                    user.avatar= User.avatarPath+'/'+ req.file.filename;
                }
                console.log(req.file);
                user.save();
                return res.redirect('back');
                
            });


        } catch (err) {
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
        return res.status(401).send('UnAuthorized');
    }
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,{
    //         name:req.body.name,
    //         email:req.body.email
    //     },function(err,user){
    //         return res.redirect('/');
    //     })
    // }else{
    //     return res.status(401).send('UnAuthorized');
    // }
}

module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Socio|signIn'
    })
};
module.exports.signup= function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
    req.flash('success','Logged In Successfully');
    return res.redirect('/');
}
module.exports.destroySession = function(req,res){

    req.logout();
    req.flash('success','Logged Out Successfully');
    return res.redirect('/');
}