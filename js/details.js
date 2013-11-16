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
      $('.lot-container').append(template({lot: l, highBid: highBid.highBid, highBidder: highBid.highBidder, totalBids: highBid.totalBids}));
		}).error(function(e) {
      $('.lot-container').append(e);
    });

    var getHighBid = function(l) {
      var highBid = 0;
      var highBidder = '';

      if (!l.Bids || l.Bids.length == 0)
        return {highBid: 0, highBidder: '', totalBids: 0};

      $.each(l.Bids, function(i, bid) {
        if (bid.Amount > highBid) {
          highBid = bid.Amount;
          highBidder = bid.UserName;
        }
      });

      return {highBid: highBid, highBidder: highBidder, totalBids: l.Bids.length};
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
      }).done(function(errors, id, totalBids) {
        if (errors && errors.length > 0) {
        }
        else {
          $('#resultMsg').text('Bid accepted');
          $('#highBid').text(data.Amount);
          $('#highBidder').text(data.UserName);
          var totalBids = $('#totalBids').text();
          $('#totalBids').text(+totalBids + 1);
        }    
      });                
    });

	});
})(jQuery)



