const express = require('express');
const router = express.Router();

// import controller
const postsController = require('../controllers/postsControllers')

const posts = require('../data/posts');

// Index - list posts (text or JSON)
router.get('/', postsController.index);

// Show - single post (text or JSON)
router.get('/:id', postsController.show)

// Create - add a post
router.post('/', postsController.store);

// Update - modify a post
router.put('/:id', postsController.update)

// Destroy - remove a post
router.delete('/:id', postsController.destroy)

module.exports = router;
