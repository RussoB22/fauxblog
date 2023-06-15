const sequelize = require('../config/connection');
const { User, UserPost, UserComment, PostComment} = require('../models');
const bcrypt = require('bcrypt');
const userData = require('./userData.json');
const userPostData = require('./userPostData.json');
const userCommentData = require('./userCommentData.json');
const postCommentData = require('./postCommentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true, alter: true, drop: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Seed users
  const usersPromises = userData.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return User.create({
      ...user,
      password: hashedPassword,
    });
  });
  const users = await Promise.all(usersPromises);
  console.log('\n----- USERS SEEDED -----\n');

// Assuming you have the necessary imports and database connection

// Seed user posts
const userPostPromises = userPostData.map((post, index) => {
  const foundUser = users[index % users.length];
  return UserPost.create({
    ...post,
    user_id: foundUser.user_id,
    poster_name: foundUser.name,
  });
});

try {
  const userPosts = await Promise.all(userPostPromises);
  console.log('\n----- USER POSTS SEEDED -----\n');
} catch (error) {
  console.error('Error seeding user posts:', error);
}

// Seed user comments
const userCommentPromises = userCommentData.map(async (comment) => {
  return UserComment.create({
    ...comment,
  });
});
const userComments = await Promise.all(userCommentPromises);
console.log('\n----- USER COMMENTS SEEDED -----\n');

// Seed post comments
const postCommentPromises = postCommentData.map((postComment) => {
  return PostComment.create({
    ...postComment,
  });
});
const postComments = await Promise.all(postCommentPromises);
console.log('\n----- POST COMMENTS SEEDED -----\n');


  process.exit(0);
};

seedDatabase();
