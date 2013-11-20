var db = require("mongojs").connect("localhost:27017/silentauction", ["users", "lots"]);
var validation = require('./js/validation.js');

exports.saveLot = function(lot, f) {
  //validate the lot.
  var errors = validation.validateLot(lot);
  
  if (errors.length > 0)
    return {errors: errors};

  var saveCallback = function(errors, lot) {
    if (errors && errors.length > 0)
      f({errors: errors});

    console.log(errors);
    console.log(lot);
      
    if (!lot)
    {
      f({errors: ['no lot object returned'], id: ''});
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
  db.lots.find(function(err, lots) {
    console.log(err);
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

