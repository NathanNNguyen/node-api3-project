const express = require('express');

const server = express();

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const date = Date(Date.now())
  console.log(`${req.method} Request to ${req.originalUrl} on ${date}`)
  next();
}

module.exports = server;
