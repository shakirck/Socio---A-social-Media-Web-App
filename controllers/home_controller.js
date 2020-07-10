const Post = require('../models/post');
const User = require('../models/user');
const mongoose = require('../config/mongoose')


module.exports.home = async function(req, res){
     try{
        // CHANGE :: populate the likes of each post and comment
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');

        console.log('posts from home controlleres');
        console.log(posts);
        
        let all_users = await User.find({})

        if(req.user){
            const friends = await  User.findById(req.user.id)
            .populate({
                path:'friendships',
                populate:{
                    path:'toUser',
                    model:'User'
                }

            }).exec();
            console.log('friends',friends);
            return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: all_users,
                friends:friends.friendships
             });
        }
   
         return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: all_users,
          });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
