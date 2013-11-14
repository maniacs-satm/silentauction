var http = require('http');
var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.bodyParser());
app.use('/js', express.static('./js'));
app.use('/css', express.static('./css'));

var database = require('./data.js');

app.get('/data', function(req, res) {
  res.send(JSON.stringify({test: true, value: 100}));
});

app.get('/gettime', function(req, res) {
  var d = new Date();
  res.send(JSON.stringify({current: d}));
});
 
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/lot/create', function(req, res) {
  res.render('create');
});

app.get('/lot/details/:id', function(req, res) {
  res.render('details', {id: req.params.id});
});

app.post('/api/lot/create', function(req, res) {
  var errors = database.saveLot(req.body.lot);
  res.send(JSON.stringify(errors));
});

app.get('/api/lot/details', function(req, res) {
  var id = req.query.id;
  var f = function(data){
    res.send(JSON.stringify(data));
  };

  database.getDetails(f, id);
});

app.post('/api/bid/put', function(req, res) {
  database.saveBid(req.body.bid);
});

app.post('/api/lot/delete', function(req, res) {
  database.deleteLots();
});

app.get('/api/lots/open', function(req, res) {
  var f = function(data){
    res.send(JSON.stringify(data));
  };

  database.getOpenLots(f);
});

http.createServer(app).listen(8888, function() {
  ('express app started.');
});


