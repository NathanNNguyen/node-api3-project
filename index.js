// code away!
const express = require('express');

const PostRouter = require('./posts/postRouter');
const UserRouter = require('./users/userRouter');
const server = require('./server.js');

server.use(express.json());
server.use('/api/posts', PostRouter);
server.use('/api/users', UserRouter);

const port = process.env.PORT || 5000;
server.listen(port, console.log(`Server listening on port ${port}`));