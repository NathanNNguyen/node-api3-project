const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = req.body;
  try {
    const inserted = await Users.insert(user)
    res.status(200).json(inserted)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.post('/:id/posts', async (req, res) => {
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

router.get('/', async (req, res) => {
  const users = await Users.get();
  try {
    res.status(200).json(users)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.getById(id);
    res.status(200).json(user)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.get('/:id/posts', async (req, res) => {
  const { id } = req.params;
  try {
    const userPosts = await Users.getUserPosts(id)
    res.status(200).json(userPosts)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  // const user = req.body;
  try {
    const removed = await Users.remove(id);
    res.status(200).json(removed)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.put('/:id', async (req, res) => {
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

function validateUserId(req, res, next) {

}

function validateUser(req, res, next) {

}

function validatePost(req, res, next) {

}

module.exports = router;
