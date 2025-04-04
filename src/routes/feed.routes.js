const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed.controller');
const auth = require('../middleware/auth');

router.post('/', auth, feedController.createPost);
router.get('/', auth, feedController.getFeed);
router.post('/:id/like', auth, feedController.likePost);

module.exports = router;