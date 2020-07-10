const User = require('../models/user');
const FriendShip = require('../models/friendship');

module.exports.toggleFriends = async function(req,res){
    let status = false;
    try {
        console.log( req.user.id + '  ' + req.query.id);
        let user = await User.findById(req.user.id).populate('friendships');

        let checkExistingFriends = await FriendShip.findOne({
            fromUser:req.user._id,
            toUser:req.query.id
        });

        if(checkExistingFriends){
            console.log('already friends');//remove from friends
            user.friendships.pull(checkExistingFriends._id);
            user.save();
            checkExistingFriends.remove();

         }
        else{
            console.log('not friends yet')//add to friends

            const newFriends = await FriendShip.create({
                fromUser:req.user._id,
                toUser:req.query.id
            });
            user.friendships.push(newFriends._id);
            user.save();
            status = true;
  
        }
        console.log(user);
        return res.status(200).json({
            message: "Request successful!",
            data: {     
                status: status
            }
        })
    } catch (error) {
        console.log('Internal server error ',error);
        return;
    }


}