const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

http.createServer(app).listen(80);

module.exports = app;
