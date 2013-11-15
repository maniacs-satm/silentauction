var dburl = "localhost:27017";
var collections = ["users", "lots"];
var db = require("mongojs").connect(dburl, collections);
var validation = require('./js/validation.js');

exports.saveLot = function(lot, f) {
  //validate the lot.
  var errors = validation.validateLot(lot);

  if (errors.length > 0)
    return {errors: errors};

  db.lots.save(lot, function(e, l) { f({errors: errors, id: l._id}); });

};

exports.saveBid = function(bid) {
  var getCallback = function(l) {
    if (!l.Bids) l.Bids = [];
    l.Bids.push(bid);
    exports.saveLot(l);
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

