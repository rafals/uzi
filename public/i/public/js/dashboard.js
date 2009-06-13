Element.implement({
  show: function() {
    this.setStyle('display','');
  },
  hide: function() {
    this.setStyle('display','none');
  }
})

function show_friends_chart() {
  $('friends_chart').show()
  $('friends_list').hide()
}

function show_friends_list() {
  $('friends_chart').hide()
  $('friends_list').show()
}

function anuluj_zaqpek() {
  $('koszt').set('value', '')
  $('nazwa').set('value', '')
  $('dla').set('value', '')
  $('dodawarka_zaqpka').hide()
  $('dodaj_zaqpek').show()
}

function anuluj_znajomego() {
  $('nick').set('value', '')
  $('dodawarka_znajomego').hide()
  $('dodaj_znajomego').show()
}

window.addEvent('domready', function() {
  var tokens = ['rav', 'kraxi', 'jercik', 'poskart']
  new GrowingInput('dla', {
		min: 24,
		max: 60,
		startWidth: 150,
		correction: 30
	})
  new Autocompleter.Local('dla', tokens, {
  		'minLength': 1, // We need at least 1 character
  		'selectMode': 'type-ahead', // Instant completion
  		'multiple': true, // Tag support, by default comma separated
  		'delay': 0
  	});
  
  $('dodaj_znajomego').addEvent('click', function() {
    //window.location = '/dodaj_znajomego'
    $('dodawarka_znajomego').show()
    $('dodaj_znajomego').hide()
    $('nick').focus()
  })
  
  $('dodaj_zaqpek').addEvent('click', function() {
    $('dodawarka_zaqpka').show()
    $('dodaj_zaqpek').hide()
    //$('dodaj_znajomego').hide()
    $('koszt').focus()
  })
})
