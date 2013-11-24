var db = require("mongojs").connect("localhost:27017/silentauction", ["users", "lots"]);
var validation = require('./js/validation.js');

exports.getUsers = function(f) {
  db.users.find(function(err, users) {
    if (!err && users) {
      f(users);
    }
  });
};

exports.getUser = function(username, f) {
  db.users.find({UserName: username}, function(err, users) {
    if (err) {
      f({errors: err, result: false});
    }
    else if (users && users.length > 0) {
      f({errors: [], result: true, user: users[0]});    
    }
    else {
      f({errors: ['no user found'], result: false});    
    }
  });
};


exports.saveUser = function(user, f) {
  var saveCallback = function(errors, user) {
    if (errors && errors.length > 0) {
      f({result:false, errors: errors});
      return;
    }
    
    f({result: true});
    return;
  };

  db.users.find({UserName: user.UserName}, function(err, users) {
    if (err) {
      f({errors: err, result: false});
      return;
    }
    
    if (users && users.length > 0) {
      f({errors: ['user name already exists'], result: false});
      return;
    }
      
    db.users.save(user, saveCallback);
  });
};


exports.saveLot = function(lot, f) {
  //validate the lot.
  var errors = validation.validateLot(lot);
  
  if (errors.length > 0)
    return {errors: errors};

  var saveCallback = function(errors, lot) {
    if (errors && errors.length > 0)
      f({errors: errors});

    if (!lot)
    {
      f({errors: ['no lot object returned'], id: ''});
      return;
    }
      
    f({errors: [], id: lot._id});
  };

  db.lots.save(lot, saveCallback);
};

exports.saveBid = function(bid, f) {
  var getCallback = function(l) {
    if (!l.Bids) l.Bids = [];
    l.Bids.push(bid);
    exports.saveLot(l, f);
  };
  exports.getDetails(getCallback, bid.LotId);
};

exports.deleteLots = function() {
  var deleteCallback = function(lots) {
    for(var i = lots.length - 1; i >= 0; i--)
    {
      db.lots.remove(lots[i]);
    }
  };

  exports.getOpenLots(deleteCallback);
};

exports.getOpenLots = function(f) {
  var d = new Date()
  db.lots.find({EndDateTime: { $gt: d }}, function(err, lots) {
    if (!err && lots) {
      f(lots);
    }
  });
};

exports.getClosedLots = function(f) {
  var d = new Date()
  db.lots.find({EndDateTime: { $lt: d }}, function(err, lots) {
    if (!err && lots) {
      f(lots);
    }
  });
};


exports.getDetails = function(f, id) {
  db.lots.find({_id: require("mongojs").ObjectId(id)}, function(err, lot) {
    if (!err && lot) {
      if (lot.length > 0) f(lot[0]);
    }
  });
};

