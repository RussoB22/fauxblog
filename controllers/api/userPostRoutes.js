const router = require('express').Router();
const { User, UserPost, UserComment, PostComment } = require('../../models');

// Endpoint - /user-post

// Get all user posts
router.get('/', async (req, res) => {
  try {
    const userPosts = await UserPost.findAll({
      attributes: { exclude: ['user_id'] },
      include: [
        {
          model: User,
          as: 'poster',
          attributes: ['name'],
        },
        {
          model: PostComment,
          attributes: { exclude: ['post_id', 'postcomment_id'] },
          include: [
            {
              model: UserComment,
              attributes: ['text', 'posted_time'],
              include: [
                {
                  model: User,
                  as: 'commenter',
                  attributes: ['name'],
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user post by ID
router.get('/:id', async (req, res) => {
  try {
    const userPost = await UserPost.findByPk(req.params.id, {
      attributes: { exclude: ['user_id'] },
      include: [
        {
          model: User,
          as: 'poster',
          attributes: ['name'],
        },
        {
          model: PostComment,
          attributes: { exclude: ['post_id', 'postcomment_id'] },
          include: [
            {
              model: UserComment,
              attributes: ['text', 'posted_time'],
              include: [
                {
                  model: User,
                  as: 'commenter',
                  attributes: ['name'],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!userPost) {
      res.status(404).json({ message: 'No user post found with this id!' });
      return;
    }

    res.status(200).json(userPost);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Create a new user post
router.post('/', async (req, res) => {
  try {
    const userPostData = await UserPost.create(req.body);
    res.status(201).json(userPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a user post by ID
router.put('/:id', async (req, res) => {
  try {
    const userPost = await UserPost.findByPk(req.params.id);

    if (!userPost) {
      res.status(404).json({ message: 'No user post found with this id!' });
      return;
    }

    await userPost.update(req.body);

    res.status(200).json({ message: 'User post updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user post by ID
router.delete('/:id', async (req, res) => {
  try {
    const userPost = await UserPost.findByPk(req.params.id);

    if (!userPost) {
      res.status(404).json({ message: 'No user post found with this id!' });
      return;
    }

    await userPost.destroy();

    res.status(200).json({ message: 'User post deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
