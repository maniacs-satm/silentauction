var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.bodyParser());
app.use('/js', express.static('./js'));
app.use('/css', express.static('./css'));
app.use('/images', express.static('./images'))

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

var getFileExt = function(name) {
  var parts = name.split('.');
  if (parts.length < 2)
    return '';

  return parts[parts.length - 1];
};

var getImageName = function(name, id, type) {
  var ext = getFileExt(name);
  return type + "_" + id + "." + ext;
};


var saveFile = function(path, name, id, type) {
  fs.readFile(path, function (err, data) {
    var ext = getFileExt(name);
    var newPath = __dirname + "/images/" + getImageName(name, id, type);
    fs.writeFile(newPath, data, function (err) {
      console.log(err);
    });
  });
};

app.post('/lot/create', function(req, res) {
  var lot = {
    Title: req.body.title,
    Description: req.body.description,
    MinimumBid: req.body.minimumBid,
    DonatedBy: req.body.donatedBy,
    DonatedLink: req.body.donatedLink,
    StartDate: req.body.startDate,
    StartTime: req.startTime + req.body.startAMPM,
    EndDate: req.body.endDate,
    EndTime: req.body.endTime + req.body.endAMPM,
    SmallImageExt: getFileExt(req.files.smallImage.name),
    LargeImageExt: getFileExt(req.files.largeImage.name)
  };
  
  database.saveLot(lot, function(rtn){
    saveFile(req.files.smallImage.path, req.files.smallImage.name, rtn.id, 'small');
    saveFile(req.files.largeImage.path, req.files.largeImage.name, rtn.id, 'large'); 

    res.render('create');
 });

});

app.get('/register', function(req, res) {
  res.render('register');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/api/user/login', function(req, res) {
  // check if the user exists
  // check if the password matches.
  // return true of false
  var result = {result: true, errors: []};
  res.send(JSON.stringify(result));
});


app.post('/api/user/register', function(req, res) {
  var f = function(result) {
    res.send(JSON.stringify(result));
  };
  
  database.saveUser(req.body.user, f);
});

app.post('/api/user/getall', function(req, res) {
  var f = function(data){
    res.send(JSON.stringify(data));
  };

  database.getUsers(f);
});

app.get('/api/lot/details', function(req, res) {
  var id = req.query.id;
  var f = function(data){
    res.send(JSON.stringify(data));
  };

  database.getDetails(f, id);
});

app.post('/api/bid/put', function(req, res) {
  var c = function(errors, id) {
    res.send(JSON.stringify({errors: errors, id: id}));
  };
  
  database.saveBid(req.body.bid, c);
});

app.post('/api/lot/delete', function(req, res) {
  database.deleteLots();
});

app.get('/api/lots/open', function(req, res) {
  var f = function(data){
    console.log(data);
    res.send(JSON.stringify(data));
  };

  database.getOpenLots(f);
});

http.createServer(app).listen(8888, function() {
  ('express app started.');
});


