const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userPostRoutes = require('./userPostRoutes');
const userCommentRoutes = require('./userCommentRoutes');
const postCommentRoutes = require('./postCommentRoutes');
const sessionRoutes = require('./sessionRoutes');

router.use('/user', userRoutes);
router.use('/user-post', userPostRoutes);
router.use('/user-comment', userCommentRoutes);
router.use('/post-comment', postCommentRoutes);
router.use('/session', sessionRoutes);

module.exports = router;
