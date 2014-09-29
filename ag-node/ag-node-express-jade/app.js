var express = require('express');
var app = express();

app.get('/hello.txt', function(req, res) {
  res.send('hello world');
});

var server = app.listen(3000, function() {
  console.log('listening on port %d', server.address().port);
});

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

