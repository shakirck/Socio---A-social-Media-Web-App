const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        refer:'user',

    }
},{
    timestamps:true;
});

const Post = mongoose.Schema('Post',postSchema);

module.exports  = Post;