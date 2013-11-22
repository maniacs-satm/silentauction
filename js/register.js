(function($) { 
  $(document).ready(function() {

    $('#register').click(function(e) {
      
      var user = {UserName: $('#username').val(), 
            Password: $('#password').val()};

      $.ajax({
        type: "post",
        data: {user: user},
        url: "/api/user/register",
        dataType: "json"
      }).done(function(result){
        if (result.errors && result.errors.length > 0) {
          $.each(result.errors, function(i, e) {
            $('#status').append($('<div>').html(e));
          });
        }
        else {
          $('#status').html('please check your email to complete your registration.');
        }
      });
    });
  });

})(jQuery)



