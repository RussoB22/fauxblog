const User = require('./User');
const UserPost = require('./UserPost');
const UserComment = require('./UserComment');
const PostComment = require('./PostComment');

// Associations for User
User.hasMany(UserPost, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(UserComment, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Associations for UserPost
UserPost.belongsTo(User, {as:'poster', foreignKey: 'user_id' });
UserPost.hasMany(PostComment, { foreignKey: 'post_id' });

// Associations for UserComment
UserComment.belongsTo(User, {as:'commenter', foreignKey: 'user_id' });
UserComment.hasMany(PostComment, { foreignKey: 'comment_id' });

// Associations for PostComment
PostComment.belongsTo(UserPost, { foreignKey: 'post_id' });
PostComment.belongsTo(UserComment, { foreignKey: 'comment_id' });

module.exports = {
  User,
  UserPost,
  UserComment,
  PostComment,
};
