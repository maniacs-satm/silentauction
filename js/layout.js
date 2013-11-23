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
        $('.logged-in').show();
        $('.logged-out').hide();
      }
      else {
        $('#headerLogin').show();
        $('#headerLogout').hide();
        $('.header-right').hide();
        $('.logged-out').hide();
        $('.logged-in').show();
      }
    });

    $('#headerLogin').click(function(e) {
      document.location = '/login';
    });

    $('#headerMenu').click(function(e) {
      if($('.header-menu').is(':hidden')) {
        $('.header-menu').slideDown(function() {
          $('#menuImage').attr('src', '/css/images/up-arrow.png');
        });
      } else {
        $('.header-menu').slideUp(function() {
          $('#menuImage').attr('src', '/css/images/down-arrow.png');
        });
      }
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
