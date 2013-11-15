(function($) { 
  $(document).ready(function() {

    setUpDateFields();

    $('#create').click(function() {
      var data = {
            Title: $('#title').val(),
            Description: $('#description').val(),
            MinimumBid: $('#minimumBid').val(),
            DonatedBy: $('#donatedBy').val(),
            DonatedLink: $('#donatedLink').val(),
            StartDate: $('#startDate').val(),
            StartTime: $('#startTime').val() + $('#startAMPM').val(),
            EndDate: $('#endDate').val(),
            EndTime: $('#endTime').val() + $('#endAMPM').val(),
            smallImage: $('#smallImage').val(),
            largeImage: $('#largeImage').val()
      };

      $.ajax({
        type: "file",
        data: {'lot': data},
        url: "/api/lot/create",
        dataType: "json"
      }).done(function(errors){
          $('#status').show().empty();

          if (errors && errors.length > 0)
          {
            $.each(errors, function(i, error) {
              $('#status').append($("<p>").text(error));
            });        
          }
          else {
            $('form input').val('');
            $('#status').append($('<p>').text('Lot created successfully'));
          }

          setTimeout(function(){$('#status').fadeOut();}, 3000);
        
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

  var setUpDateFields = function() {
    $('#startDate').datepicker();
    $('#endDate').datepicker();

    $('.time').empty();
    for(var i=1; i<=12; i++){
      $('.time').append($('<option>').val(i).text(i));
    }

    $('#startTime').val('8');
    $('#endTime').val('4');

    $('.time').keypress(function() {
      return false;
    });

    $('.ampm').empty();
    $('.ampm').append($('<option>').val('am').text('am'));
    $('.ampm').append($('<option>').val('pm').text('pm'));
    $('#endAMPM').val('pm')
  };

})(jQuery)



