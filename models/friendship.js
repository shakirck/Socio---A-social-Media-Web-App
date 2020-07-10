const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);


const FriendShip = mongoose.model('FriendShip',friendshipSchema);
module.exports = FriendShip;