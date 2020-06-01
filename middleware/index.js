const Users = require('../users/userDb');

exports.logger = (req, res, next) => {
  const date = Date(Date.now())
  console.log(`${req.method} Request to ${req.originalUrl} on ${date}`)
  next();
}

exports.validateUserId = async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.getById(id)
  if (!user) {
    res.status(400).json({ message: 'invalid user id' })
  } else {
    req.user = user
  }
  next();
}

exports.validateUser = (req, res, next) => {
  const user = req.body;
  if (Object.entries(user).length === 0 && user.constructor === Object) {
    res.status(400).json({ message: 'missing user data' })
  } else if (!user.name) {
    res.status(400).json({ message: 'missing required field' })
  }
  next();
}

exports.validatePost = (req, res, next) => {
  const post = req.body;
  if (Object.entries(post).length === 0 && post.constructor === Object) {
    res.status(400).json({ message: 'missing post data' })
  } else if (!post.text) {
    res.status(400).json({ message: 'missing required text field' })
  } else {
    next();
  }
}
