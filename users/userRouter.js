const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();
const { logger, validatePost, validateUser, validateUserId } = require('../middleware');

router.post('/', logger, validateUser, async (req, res) => {
  const user = req.body;
  try {
    const inserted = await Users.insert(user)
    res.status(200).json(inserted)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.post('/:id/posts', logger, validatePost, async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  try {
    const inserted = await Posts.insert({ user_id: id, ...post });
    res.status(200).json(inserted)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.get('/', logger, async (req, res) => {
  const users = await Users.get();
  try {
    res.status(200).json(users)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.get('/:id', logger, validateUserId, async (req, res) => {
  try {
    res.status(200).json(req.user)
  }
  catch (err) {
    res.status(500).json({ message: 'Internal error', err })
  }
});

router.get('/:id/posts', logger, validateUserId, async (req, res) => {
  const { id } = req.params;
  try {
    const userPosts = await Users.getUserPosts(id)
    res.status(200).json(userPosts)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.delete('/:id', logger, validateUserId, async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Users.remove(id);
    res.status(200).json(removed)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.put('/:id', logger, validateUser, async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    const updated = await Users.update(id, user)
    res.status(200).json(updated)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

//custom middleware



module.exports = router;
