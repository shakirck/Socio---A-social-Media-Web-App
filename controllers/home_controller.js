const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  // res.end( '<h1>SOCIO HOME<h1>');
  // res.cookies()
  // console.log(req.cookies);
  // Post.find({},function(err,posts){
  //     if(err){console.log('Error fetching Posts');}
  //     return res.render('home',{
  //         title:'Home',
  //         posts:posts
  //     });
  // })
  try {
    let posts = await Post.find({})
    .sort('-createdAt')
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    let users = await User.find({}, function (err, users) {
      if (err) {
        console.log("Error fetching Posts");
      }

      return res.render("home", {
        title: "Home",
        posts: posts,
        all_users: users,
      });
    });
  } catch (err) {
    console.log('Error ',err);
  }
};
module.exports.test = function (req, res) {
  return res.render("test", {
    title: "test",
  });
};
