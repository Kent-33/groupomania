const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  postContent: { type: String, required: true },
  postIllus: { type: String, required: true },
  datePost: { type: Date, default: Date.now},
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
});
console.log(Date.now().utc)
module.exports = mongoose.model('Post', postSchema);