const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/createPost', auth, multer, postsCtrl.createPost);
router.put('/:id', auth, multer, postsCtrl.modifyPost);
router.post('/:id/like', auth, postsCtrl.likePost);
router.delete('/:id', auth, multer, postsCtrl.deletePost);
router.get('/:id', auth, postsCtrl.getOnePost);
router.get('/', auth, postsCtrl.getAllPost);

module.exports = router;