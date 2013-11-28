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
      if (l.username != '') {
        $('.logged-in').show();
        $('.logged-out').hide();
      } else {
        $('.logged-in').hide();
        $('.logged-out').show();
      }
      if (l.username != '' && new Date(l.EndDateTime) > new Date())
        $('.bid-control').show();

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
        };
      });
      return {highBid: highBid, highBidder: highBidder, totalBids: l.Bids.length};
    };

    $('#makeBid').click(function() {
      var data = {
        LotId: $("#lotId").val(),
        Amount: $("#bidAmount").val(),
      };

      $.ajax({
        type: "POST",
        data: {'bid': data},
        url: "/api/bid/put",
        dataType: "json"
      }).done(function(rtn, id, totalBids, username) {
        $('#resultMsg').empty();
        if (rtn.errors && rtn.errors.length > 0) {
          $.each(rtn.errors, function(i, err) {
            $('#resultMsg').append($('<p>').text(err));
          });
        }
        else {
          $('#resultMsg').append($('<p>').text('Bid accepted'));
          $('#highBid').text(data.Amount);
          $('#highBidder').text(username);
          var totalBids = $('#totalBids').text();
          $('#totalBids').text(+totalBids + 1);
        }    
      });                
    });
  });
})(jQuery)



