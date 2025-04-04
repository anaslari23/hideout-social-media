const express = require('express');
const router = express.Router();
const threadController = require('../controllers/thread.controller');
const auth = require('../middleware/auth');

router.post('/', auth, threadController.createTweet);
router.get('/:id', auth, threadController.getThread);
router.post('/:id/reply', auth, threadController.replyToTweet);

module.exports = router;