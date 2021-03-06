const express = require('express');

const Posts = require('./postDb');
const router = express.Router();

const { logger, validatePost } = require('../middleware');

router.get('/', logger, async (req, res) => {
  const posts = await Posts.get();
  try {
    res.status(200).json(posts)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.get('/:id', logger, async (req, res) => {
  const { id } = req.params;
  const post = await Posts.getById(id);
  try {
    if (!post) {
      res.status(404).json({ message: 'The post with specified ID is invalid' })
    } else {
      res.status(200).json(post)
    }
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.delete('/:id', logger, async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  try {
    const removed = await Posts.remove(id)
    if (!post) {
      res.status(404).json({ message: 'Post does not exist' })
    } else {
      res.status(200).json(removed)
    }
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.put('/:id', logger, validatePost, async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  try {
    if (!post) {
      res.status(404).json({ message: 'Post does not exist' })
    } else {
      const updated = await Posts.update(id, post)
      res.status(200).json(updated)
    }
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

// custom middleware

module.exports = router;
