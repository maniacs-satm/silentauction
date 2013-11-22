(function($) { 
  $(document).ready(function() {

    $('#login').click(function(e) {
      
      var user = {UserName: $('#username').val(), 
            Password: $('#password').val()};

      $.ajax({
        type: "post",
        data: {user: user},
        url: "/api/user/login",
        dataType: "json"
      }).done(function(result){
        if (!result.result) {
          $.each(result.errors, function(i, e) {
            $('#status').append($('<div>').html(e));
          });
        }
        else {
          document.location = '/';
        }
      });
    });
  });

})(jQuery)
