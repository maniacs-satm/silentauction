(function($) { 
  $(document).ready(function() {

    $.ajax({
      type: "post",
      url: "/api/user/getCurrent",
      dataType: "json"
    }).done(function(username){
      console.log(username);
      if (username) {
        $('#headerUserName').text(username);
        $('#headerLogin').hide();
        $('#headerLogout').show();
        $('.header-right').show();
      }
      else {
        $('#headerLogin').show();
        $('#headerLogout').hide();
        $('.header-right').hide();
      }
    });

    $('#headerLogin').click(function(e) {
      document.location = '/login';
    });

    $('#headerLogout').click(function(e) {
      $.ajax({
        type: "post",
        url: "/api/user/logout",
        dataType: "json"
      }).done(function(result){
        document.location = '/login';
      });
    });
  });
})(jQuery)
