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
      $.each(lots, function(i, l){
        $('.lot-container').append(template({lot: l}));
      });
		});

	});
})(jQuery)



