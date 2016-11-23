const PORT = process.env.PORT || 5000;

var express = require('express');
var app = express();
var path = require('path');
var chalk = require('chalk');

app.use(
  require('morgan')('dev'),
  express.static(path.join(__dirname, '../client'))
);

app.listen(PORT, () => console.log(
  chalk.green.bold('Spotify Artist Search file server listening on port: ') 
  + chalk.cyan.bold(PORT)
));