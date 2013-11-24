(function($) { 
  $(document).ready(function() {
    var source = $('#lot-template').html();
    var template = Handlebars.compile(source);

    $('.lot-container').on('click', '.details-link', function(e) {
      var id = $(this).find('.lot-id').val();
      document.location = '/lot/details/' + id;
    });

		$.ajax({
			type: "GET",
			url: "/api/lots/open",
			dataType: "json"
		}).done(function(lots) {
      lots.sort(function(a, b) {
        if (a.EndDateTime < b.EndDateTime)
          return -1;
        else
          return 1;
      });
      $.each(lots, function(i, l){
        $('.lot-container').append(template({lot: l}));
      });
		}).fail(function(x, e, d) {
      console.log('fail');
      console.log(x);
      console.log(e);
      console.log(d);
    }).always(function() {
      console.log('always');
    });

	});
})(jQuery)



