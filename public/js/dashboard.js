var Zaqpki = {}
window.addEvent('domready', function() {
  Zaqpki.menu = (function() {
    var main = $('menu_content')
    var togglers = main.getChildren('.title')
    var sections = main.getChildren('.section')
    return new Accordion(main, togglers, sections, {
      initialDisplayFx: false,
      show: 0,
      onActive: function(toggler){
        toggler.addClass('active')
  			$('menu_top').className = (toggler != main.getFirst('.title')) ? "top_dark" : "top_light";
  			$('menu_bottom').className = (toggler != main.getLast('.title')) ? "bottom_dark" : "bottom_light";
  		},
  		onBackground: function(toggler){
  			toggler.removeClass('active')
  		}
    })
  })()
  
  Zaqpki.content = new View()
  $$('#content > div[id]').each(function(content) {
    var id = content.get('id')
    var view = Zaqpki[id] = new ElementView(content)
    Zaqpki.content.push(view)
    var link = $$('#Show' + id)
    if(link) {
      link.addEvent('click', function() {
        view.open()
      })
    }
  })
  Zaqpki.Stats.open()
})