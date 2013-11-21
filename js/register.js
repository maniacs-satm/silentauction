(function($) { 
  $(document).ready(function() {


    $('#register').click(function(e) {
      var data = {
            UserName: $('#username').val(),
            Password: $('#password').val()
      };

      $.ajax({
        type: "post",
        data: data,
        url: "/api/user/register",
        dataType: "json"
      }).done(function(errors){
        $('#status').html('please check your email to complete your registration.');
      });
    });
  });

})(jQuery)



