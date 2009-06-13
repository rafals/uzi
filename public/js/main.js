Element.implement({
  show: function() {
    this.setStyle('display','');
  },
  hide: function() {
    this.setStyle('display','none');
  }
});

function loginCheck(el) {
  if (!el.value.test(/^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i) && !el.value.test(/^[a-z0-9 ._-]+$/i)) {
      el.errors.push(formcheckLanguage.login);
        return false;
    } else {
        return true;
    }
}

var currentUser;
var addForInput;

function login(user) {
  var friendsList = $('friendsList')
  if (currentUser) {
    friendsList.getChildren().destroy()
  }
  currentUser = user
  var friends = currentUser.friends
  var addForSuggestions = []
  for (i=0;i<friends.length;i++) {
    var friend = friends[i]
    var content = '<span class="friendName">' + friend.name + '</span><span class="friendSaldo">' + friend.saldo  + '</span>'
    var f = new Element('div', {class : 'friend', html : content})
    if(friends[i].id == currentUser.id) {
      f.set('id', 'me')
    } else {
      html = '<div class="friend">' + content + '</div>'
      addForSuggestions.push([friend.id, friend.name, friend.name, html])
    }
    f.inject(friendsList)
  }
  addForInput.plugins['autocomplete'].setValues(addForSuggestions);
}

function showAddForm() {
  $('addForm').show()
  $('addCost').focus()
}

function showLoginForm() {
  $('loginForm').show()
  $('loginLogin').focus()
}

function showSignupForm() {
  $('signupForm').show()
  $('signupLogin').focus()
}

function showStats() {
  $('stats').show()
}

window.addEvent('domready', function(){
  showLoginForm()
  
  // NAVIGATION
  
  $('showSignup').addEvent('click', function(event) {
    $('loginForm').hide()
    showSignupForm()
  })
  
  $('showLogin').addEvent('click', function(event) {
    $('signupForm').hide()
    showLoginForm()
  })
  
  $('showAddForm').addEvent('click', function(event) {
    $('stats').hide()
    showAddForm()
  })
  
  $('showStats').addEvent('click', function(event) {
    $('addForm').hide()
    showStats()
  })
  
  // FORMS
  
  new FormCheck('loginForm', {
    submitByAjax : true,
    onAjaxSuccess : function(response) {
      var user = eval('(' + response + ')')
      login(user)
      $('loginForm').hide()
      showStats()
    },
    onAjaxFailure : function(response) {
      var error = new Element('div', {class: 'error', text: 'Błędne dane logowania.'})
      error.inject($('loginSubmit'), 'before')
      $('loginLogin').addEvent('change', function() {
        error.destroy()
      })
      $('loginPassword').addEvent('change', function() {
        error.destroy()
      })
    },
    fieldErrorClass : 'invalidField',
    errorClass : 'error',
    display : {
      errorsLocation : 3,
      indicateErrors : 2,
      flashTips : true,
      fadeDuration : 1000,
      addClassErrorToField : 1
    }
  })
  new FormCheck('signupForm', {
    submitByAjax : true,
    onAjaxSuccess : function(response) {
      var user = eval('(' + response + ')')
      $('signupForm').hide()
      showStats(user)
    },
    fieldErrorClass : 'invalidField',
    errorClass : 'error',
    display : {
      errorsLocation : 3,
      indicateErrors : 2,
      flashTips : true,
      fadeDuration : 1000,
      addClassErrorToField : 1
    }
  })
  new FormCheck('addForm', {
    submitByAjax : true,
    onAjaxSuccess : function(response) {
      var user = eval('(' + response + ')')
      login(user)
      document.getElementById('addForm').reset()
      $('addForm').hide()
      showStats()
    },
    onAjaxFailure : function(response) {
      $('addForm').reset()
      alert('zle')
    },
    fieldErrorClass : 'invalidField',
    errorClass : 'error',
    display : {
      errorsLocation : 3,
      indicateErrors : 2,
      flashTips : true,
      fadeDuration : 1000,
      addClassErrorToField : 1
    }
  })
  
  addForInput = new TextboxList('addFor', {unique: true, plugins: {autocomplete: {
    minLength: 0,
		maxResults: 20,
		insensitive: true,
		highlight: true,
		highlightSelector: null,
		mouseInteraction: true,
		onlyFromValues: false,
		method: 'standard',
		placeholder: 'Podaj nazwy ludzi'
  }}});
  $$('.textboxlist-bits input').addEvent('focus', function() {
    $$('.textboxlist-bits').set('style', 'background: black;')
  })
  $$('.textboxlist-bits input').addEvent('blur', function() {
    $$('.textboxlist-bits').set('style', '')
  })
  
})