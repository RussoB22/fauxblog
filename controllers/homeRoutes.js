const router = require('express').Router();
const { User, UserPost} = require('../models');
const withAuth = require('../utils/auth');

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

    const posts = postData.map(post => post.get({ plain: true }));

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

    const posts = postData.map(post => post.get({ plain: true }));

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
