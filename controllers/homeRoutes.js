const router = require('express').Router();
const { User, UserPost} = require('../models');
const withAuth = require('../utils/auth');
const moment = require('moment');

router.get('/', async (req, res) => {
  try {
    const postData = await UserPost.findAll({
      include: [
        {
          model: User,
          as: 'poster',
          attributes: ['name', 'email'],
        },
      ],
    });

    const posts = postData.map(post => {
      let plainPost = post.get({ plain: true });
      // Convert the posted_time to "MM/DD/YY, hh:mm:ss A" format
      plainPost.posted_time = moment(plainPost.posted_time).format('MM/DD/YY, h:mm:ss A');
      return plainPost;
    });

    res.render('homepage', {
      user: req.session.user,
      logged_in: req.session.logged_in,
      posts: posts,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await UserPost.findAll({
      where: {
        user_id: req.session.user.user_id,
      },
      include: [
        {
          model: User,
          as: 'poster',
          attributes: ['name', 'email'],
        },
      ],
    });

    const posts = postData.map(post => {
      let plainPost = post.get({ plain: true });
      // Convert the posted_time to "MM/DD/YY, hh:mm:ss A" format
      plainPost.posted_time = moment(plainPost.posted_time).format('MM/DD/YY, h:mm:ss A');
      return plainPost;
    });

    res.render('dashboard', {
      user: req.session.user,
      logged_in: req.session.logged_in,
      posts: posts,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/profile', withAuth, async (req, res) => {
  try {

    const user = req.session.user;
    res.render('profile', {
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
