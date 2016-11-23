const PORT = process.argv[2] || 1337;

var express = require('express');
var app = express();
var path = require('path');
var chalk = require('chalk');

app.use(
  require('morgan')('dev'),
  express.static(path.join(__dirname, '../client'))
);

app.listen(PORT, () => console.log(
  chalk.green.bold('Reddit Viewer file server listening on port: ') 
  + chalk.cyan.bold(PORT)
));