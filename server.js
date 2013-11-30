var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var crypto = require('crypto');
var config = require('./config');

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.bodyParser());
app.use('/js', express.static('./js'));
app.use('/css', express.static('./css'));
app.use('/images', express.static('./images'))

var database = require('./data.js');

app.post('/api/utils/gettime', function(req, res) {
  res.send(JSON.stringify(new Date()));
});
 
app.get('/', function(req, res) {
  res.render('index', {admin: req.session.isAdmin});
});

app.get('/lot/create', function(req, res) {
  res.render('create', {admin: req.session.isAdmin});
});

app.get('/lot/details/:id', function(req, res) {
  res.render('details', {id: req.params.id, admin: req.session.isAdmin});
});

app.get('/lots/closed', function(req, res) {
  res.render('closed', {admin: req.session.isAdmin});
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
  var start = new Date(req.body.startDate + ' ' + req.body.startTime + ':00 ' + req.body.startAMPM);
  var end = new Date(req.body.endDate + ' ' + req.body.endTime + ':00 ' + req.body.endAMPM);

  var lot = {
    Title: req.body.title,
    Description: req.body.description,
    MinimumBid: req.body.minimumBid,
    DonatedBy: req.body.donatedBy,
    DonatedLink: req.body.donatedLink,
    StartDateTime: start,
    EndDateTime: end,
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

var IsAdmin = function(username) {
  for(var i=0; i<config.admins.length; i++)
  {
    if (config.admins[i] == username)
      return true;
  }
  return false;
}

app.post('/api/user/login', function(req, res) {
  req.body.user.Password = crypto.createHmac('sha1', 'fgw039kxx').update(req.body.user.Password).digest('hex'); 

  database.getUser(req.body.user.UserName, function(result) {
    if (result.result && result.user.Password == req.body.user.Password) {
      req.session.username = result.user.UserName;
      req.session.loggedIn = true;      
      req.session.isAdmin = IsAdmin(result.user.UserName);
      result.result = true;
    }
    else {
      result.result = false;
      result.errors = ['Login failed.'];
    }
    res.send(JSON.stringify(result));
  });
});

app.post('/api/user/logout', function(req, res) {
  req.session.username = '';
  req.session.loggedIn = false;
  res.send(JSON.stringify({result: true}));
});


app.post('/api/user/getCurrent', function(req, res) {
  if (req.session.username && req.session.loggedIn)
    res.send(JSON.stringify(req.session.username));
  else
    res.send(JSON.stringify(''));
});

app.post('/api/user/register', function(req, res) {
  var f = function(result) {
    res.send(JSON.stringify(result));
  };
  req.body.user.Password = crypto.createHmac('sha1', 'fgw039kxx').update(req.body.user.Password).digest('hex'); 
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
    data.username = req.session.username || '';
    res.send(JSON.stringify(data));
  };

  console.log(id);
  database.getDetails(f, id);
});

app.post('/api/bid/total', function(req, res) {
  database.getTotalBids(function(total) {
    res.send(JSON.stringify({total: total}));
  });
});

app.post('/api/bid/put', function(req, res) {
  var c = function(rtn) {
    res.send(JSON.stringify({errors: rtn.errors, id: rtn.id, username: req.session.username}));
  };

  req.body.bid.UserName = req.session.username;
  database.saveBid(req.body.bid, c);
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

app.get('/api/lots/closed', function(req, res) {
  var f = function(data){
    res.send(JSON.stringify(data));
  };
  
  database.getClosedLots(f);
});

http.createServer(app).listen(8888, function() {
  ('express app started.');
});


