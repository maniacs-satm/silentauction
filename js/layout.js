(function($) { 
  $(document).ready(function() {

    $.ajax({
      type: "post",
      url: "/api/user/getCurrent",
      dataType: "json"
    }).done(function(username){
      if (username) {
        $('#headerUserName').text(username);
        $('#headerLogin').hide();
        $('#headerLogout').show();
        $('.logged-in').show();
        $('.logged-out').hide();
      }
      else {
        $('#headerLogin').show();
        $('#headerLogout').hide();
        $('.logged-out').show();
        $('.logged-in').hide();
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


    window.setInterval(function() {
      $.ajax({
        type: "post",
        url: "/api/utils/gettime",
        dataType: "json"
      }).done(function(time){
        $('#headerTime').html(formatDate(time));
      });
    }, 999);

    var formatDate = function(date) {
      var d = new Date(date);
      var hh = d.getHours();
      var m = d.getMinutes();
      var s = d.getSeconds();
      var dd = "AM";
      var h = hh;
      if (h >= 12) {
          h = hh-12;
          dd = "PM";
      }
      if (h == 0) {
          h = 12;
      }
      m = m<10?"0"+m:m;
      s = s<10?"0"+s:s;

      return h + ":" + m + ":" + s + dd;
    };

  });
})(jQuery)
