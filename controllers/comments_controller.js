const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require('../mailers/comments_mailer');
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();
      
      comment = await comment.populate('user').execPopulate();
      console.log('activity mail is about to be send from here');
      req.flash("success", "Your comment has been added");


      commentsMailer.newComment(comment);
      return res.redirect("/");
    }
  } catch (err) {
    req.flash("err", "Comment Adding Failed");
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      //delete comment
      let postId = comment.post;
      console.log(postId);
      Comment.remove();

      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      req.flash("success", "Comment has been removed");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "You can't remove this comment ");
    return res.redirect("back");
  }
};
