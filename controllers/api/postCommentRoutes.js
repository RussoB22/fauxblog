const router = require('express').Router();
const { PostComment, UserPost, UserComment } = require('../../models');

// Endpoint - /post-comment

// Get all post comments
router.get('/', async (req, res) => {
    try {
        const postComments = await PostComment.findAll({
            include: [
                {
                    model: UserPost,
                    as: 'post',
                },
                {
                    model: UserComment,
                    as: 'comment',
                },
            ],
        });
        res.status(200).json(postComments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single post comment by ID
router.get('/:id', async (req, res) => {
    try {
        const postComment = await PostComment.findByPk(req.params.id, {
            include: [
                {
                    model: UserPost,
                    as: 'post',
                },
                {
                    model: UserComment,
                    as: 'comment',
                },
            ],
        });

        if (!postComment) {
            res.status(404).json({ message: 'No post comment found with this id!' });
            return;
        }

        res.status(200).json(postComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new post comment
router.post('/', async (req, res) => {
    try {
        const postCommentData = await PostComment.create(req.body);
        res.status(201).json(postCommentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a post comment by ID
router.put('/:id', async (req, res) => {
    try {
        const postComment = await PostComment.findByPk(req.params.id);

        if (!postComment) {
            res.status(404).json({ message: 'No post comment found with this id!' });
            return;
        }

        await postComment.update(req.body);

        res.status(200).json({ message: 'Post comment updated successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a post comment by ID
router.delete('/:id', async (req, res) => {
    try {
        const postComment = await PostComment.findByPk(req.params.id);

        if (!postComment) {
            res.status(404).json({ message: 'No post comment found with this id!' });
            return;
        }

        await postComment.destroy();

        res.status(200).json({ message: 'Post comment deleted successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
