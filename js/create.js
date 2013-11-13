(function($) { 
  $(document).ready(function() {
    $('#create').click(function() {
      var data = {
            Title: $('#title').val(),
            Description: $('#description').val(),
            MinimumBid: $('#minimumBid').val(),
            DonatedBy: $('#donatedBy').val(),
            DonatedLink: $('#donatedLink').val(),
            StartDate: $('#startDate').val(),
            EndDate: $('#endDate').val()
      };

      $.ajax({
        type: "POST",
        data: {'lot': data},
        url: "/api/lot/create",
        dataType: "json"
      });
    });


    $('#delete').click(function() {
      $.ajax({
        type: "POST",
        url: "/api/lot/delete",
        dataType: "json"
      });
    });

 
  });
})(jQuery)



