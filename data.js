var dburl = "localhost:27017";
var collections = ["users", "lots", "bids"];
var db = require("mongojs").connect(dburl, collections);


exports.saveLot = function(lot) {
  //validate the lot.
  db.lots.save(lot);
};

exports.saveBid = function(bid) {
  db.bids.save(bid);
};

var deleteCallback = function(lots) {
  for(var i = lots.length - 1; i >= 0; i--)
  {
    db.lots.remove(lots[i]);
  }
};

exports.deleteLots = function() {
  exports.getOpenLots(deleteCallback);
};

exports.getOpenLots = function(f) {
  db.lots.find(function(err, lots) {
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

exports.getBids = function(f, lotId) {
  db.bids.find({LotId: lotId}, function(err, bids) {
    if (!err && bids) {
      f(bids);
    }
  });
};


