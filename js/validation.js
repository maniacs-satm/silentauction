exports.validateLot = function(lot) {
  var errors = [];

  if (!lot.Title || lot.Title == '')
    errors.push('Must provide Lot Title.');

  if (!lot.Description || lot.description == '')
    errors.push('Must provide Lot Description.');

  if (!lot.MinimumBid || isNaN(lot.MinimumBid) || lot.MinimumBid < 1)
    errors.push('Minimum Bid must be at least one dollar.');

  if (!lot.StartDate || lot.StartDate == '')
    errors.push('Must provide a Start Date.');

  if (!lot.StartTime || lot.StartTime == '')
    errors.push('Must provide a Start Time.');

  if (!lot.EndDate || lot.EndDate == '')
    errors.push('Must provide an End Date.');

  if (!lot.EndTime || lot.EndTime == '')
    errors.push('Must provide an End Time.');

  return errors;
}



