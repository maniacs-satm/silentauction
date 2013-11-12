(function($) { 
  $(document).ready(function() {
    $('#create').click(function() {
      var data = {id: 45,
		Title: $('#title').val(),
		Description: $('#description').val(),
		MinimumBid: $('#minimumBid').val()
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



