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
      console.log('done');
      $.each(lots, function(i, l){
		console.log(l);
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



