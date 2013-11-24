(function($) { 
  $(document).ready(function() {
    setUpDateFields();

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



