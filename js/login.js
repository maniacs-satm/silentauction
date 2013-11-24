(function($) { 
  $(document).ready(function() {

    $('#login').click(function(e) {

      $('#status').empty();

      var user = {UserName: $('#username').val(), 
            Password: $('#password').val()};

      $.ajax({
        type: "post",
        data: {user: user},
        url: "/api/user/login",
        dataType: "json"
      }).done(function(result){
        console.log(result);
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
    
    $('#register').click(function() {
      window.location.replace('/register');
    });
  });
})(jQuery)
