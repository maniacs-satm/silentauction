(function($) { 
  $(document).ready(function() {
    var source = $('#lot-template').html();
    var template = Handlebars.compile(source);

		$.ajax({
			type: "GET",
      data: {'id': $('#lotId').val()},
			url: "/api/lot/details",
			dataType: "json"
		}).done(function(l) {
      var highBid = getHighBid(l);
      $('.lot-container').append(template({lot: l, highBid: highBid.highBid, highBidder: highBid.highBidder}));
		});

    var getHighBid = function(l) {
      var highBid = 0;
      var highBidder = '';
      $.each(l.Bids, function(i, bid) {
        if (bid.Amount > highBid) {
          highBid = bid.Amount;
          highBidder = bid.UserName;
        }
      });

      return {highBid: highBid, highBidder: highBidder};
    };

    $('#makeBid').click(function() {
      var data = {
        LotId: $("#lotId").val(),
        Amount: $("#bidAmount").val(),
        UserName: $("#bidder").val()
      };

      $.ajax({
        type: "POST",
        data: {'bid': data},
        url: "/api/bid/put",
        dataType: "json"
      }).done(function(result) {
        // we need to get the result, report any errors.
        //  if success... we need to update the high bid info.
        // right now, the server is not returning a resopnse... so we don't get here.
        alert('bid accepted');      
      });                
    });

	});
})(jQuery)



