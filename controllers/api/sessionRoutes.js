const router = require('express').Router();

// Get Session user_id
router.get('/', async (req, res) => {
    if (req.session.user_id) {
      try {
        const user_id = req.session.user_id;
        res.json({ user_id });
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving user ID from session' });
      }
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
});

module.exports = router;
