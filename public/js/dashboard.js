window.addEvent('domready', function() {
  var menu = new Accordion($('content'), $$('.title'), $$('.section'), {
    onActive: function(toggler){
      toggler.addClass('active')
			$('top_round').className = (toggler != $('content').getFirst('.title')) ? "top_dark" : "top_light";
			$('bottom_round').className = (toggler != $('content').getLast('.title')) ? "bottom_dark" : "bottom_light";
		},
		onBackground: function(toggler){
			toggler.removeClass('active')
		}
  })
})