const router = require('express').Router();
const { User, UserComment } = require('../../models');

// Endpoint - /user-comment

// Get all user comments
router.get('/', async (req, res) => {
    try {
        const userComments = await UserComment.findAll({
            include: [
                {
                    model: User,
                    as: 'commenter',
                    attributes: ['name']
                }],
        });
        res.status(200).json(userComments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single user comment by ID
router.get('/:id', async (req, res) => {
    try {
        const userComment = await UserComment.findByPk(req.params.id, {
            include: [{ model: User, as: 'commenter', attributes: ['name'] }],
        });

        if (!userComment) {
            res.status(404).json({ message: 'No user comment found with this id!' });
            return;
        }

        res.status(200).json(userComment);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Create a new user comment
router.post('/', async (req, res) => {
    try {
        const userCommentData = await UserComment.create(req.body);
        res.status(201).json(userCommentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a user comment by ID
router.put('/:id', async (req, res) => {
    try {
        const userComment = await UserComment.findByPk(req.params.id);

        if (!userComment) {
            res.status(404).json({ message: 'No user comment found with this id!' });
            return;
        }

        await userComment.update(req.body);

        res.status(200).json({ message: 'User comment updated successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a user comment by ID
router.delete('/:id', async (req, res) => {
    try {
        const userComment = await UserComment.findByPk(req.params.id);

        if (!userComment) {
            res.status(404).json({ message: 'No user comment found with this id!' });
            return;
        }

        await userComment.destroy();

        res.status(200).json({ message: 'User comment deleted successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
