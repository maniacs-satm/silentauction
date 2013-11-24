exports.validateLot = function(lot) {
  var errors = [];

  if (!lot.Title || lot.Title == '')
    errors.push('Must provide Lot Title.');

  if (!lot.Description || lot.description == '')
    errors.push('Must provide Lot Description.');

  if (!lot.MinimumBid || isNaN(lot.MinimumBid) || lot.MinimumBid < 1)
    errors.push('Minimum Bid must be at least one dollar.');

  if (!lot.StartDateTime || lot.StartDateDate == '')
    errors.push('Must provide a Start Date.');

  if (!lot.EndDateTime || lot.EndDateTime == '')
    errors.push('Must provide an End Date.');

  return errors;
}



