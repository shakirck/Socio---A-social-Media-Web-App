const Post = require('../models/post');
const Comment = require('../models/comment'); 

module.exports.view = function(req,res){
    Post.find({},'content ',function(err,post){
    if(err){console.log('error while fetching posts');}
    
    console.log(post.content);
    return res.redirect('back')
    });
 }
module.exports.create =async  function(req,res){
    
   try {
    let post = await  Post.create({
        content:req.body.content,
        user : req.user._id
    });         

    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post,
            },
            message:'Post Created Success',
        }) 
    }
    req.flash('success','Your post has been added')
    return res.redirect('back');
    
   } catch (err) {
       req.flash('error',err);
       return res.redirect('back');
    }

}

module.exports.destroy = async function(req,res){
   console.log(req.xhr)
    try {
        let post = await Post.findById(req.params.id);
        
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id})
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'post deleted'
                })
            }
            req.flash('success','Your Pos has been deleted');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error','You cannot delete this post')
         return res.redirect('Error',err);
    }
}