// code away!
const express = require('express');

const PostRouter = require('./posts/postRouter');
const UserRouter = require('./users/userRouter');
const server = require('./server.js');

server.use(express.json());
server.use('/api/posts', PostRouter);
server.use('/api/users', UserRouter);

server.listen(5000, console.log('Server listening on port 5000'));