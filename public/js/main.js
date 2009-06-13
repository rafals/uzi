Element.implement({
  show: function() {
    this.setStyle('display','');
  },
  hide: function() {
    this.setStyle('display','none');
  }
});

window.addEvent('domready', function() {
  $$$().push($$$('login')).push($$$('signup')).push($$$('add')).push($$$('stats'))
  $$$('login').open()
})

var FormDefaults = new Class({
  Implements: [Options],
  options: {
    collection: $$('input[type=text]'),
    form: $$('form')
  },
  
  //initialization
  initialize: function(options) {
    //set options
    this.setOptions(options);
    this.defaults();
  },
  
  //a method that does whatever you want
  defaults: function() {
    this.options.collection.each(function(el) {
      el.set('value',el.get('rel'));
      el.addEvent('focus', function() { if(el.get('value') == el.get('rel')) { el.set('value',''); } });
      el.addEvent('blur', function() { if(el.get('value') == '') { el.set('value',el.get('rel')); } });
    });
    form.addEvent('submit', function() { this.clear.bind(this) })
  },
  
  clear: function() {
    this.options.collection.each(function(el) {
      if(el.get('value') == el.get('rel')) { el.set('value',''); }
    })
  }
});