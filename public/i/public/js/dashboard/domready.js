Zaqpki.menu = (function() {
  var main = $('menu_content')
  var togglers = main.getChildren('.title')
  var sections = main.getChildren('.section')
  return new Accordion(main, togglers, sections, {
    initialDisplayFx: false,
    show: -1,
    onActive: function(toggler){
      toggler.addClass('active')
    	$('menu_top').className = (toggler != main.getFirst('.title')) ? "top_dark" : "top_light"
    	$('menu_bottom').className = (toggler == main.getLast('.title')) ? "bottom_light" : "bottom_dark" /* ktoś to może skumać? */
    },
    onBackground: function(toggler){
    	toggler.removeClass('active')
    }
  })
})()

Zaqpki.content = new View()
$$('#content > div[id]').each(function(content) {
  /* widoki domyślne dla pluginów, które własnych widoków nie implementują */
  if (!Views[content.get('id')]) {
    var view = Views[content.get('id')] = new ElementView(content)
  }
})
Views.each(function(view) {
  Zaqpki.content.push(view)
  /* widoki aktywują odpowiadające im pozycje w menu ?? */
})
/* linki z tagiem show otwierają widoki */
var links = $$('[show]')
links.each(function(link) {
  var view = Views[link.get('show')]
  if (view) {
    link.addEvent('click', function() {
      view.open()
    })
  }
})