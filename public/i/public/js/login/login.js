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

function showLoginForm() {
  $('loginForm').show()
  $('loginLogin').focus()
}

function showSignupForm() {
  $('signupForm').show()
  $('signupLogin').focus()
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
  
  // FORMS
  
  new FormCheck('loginForm', {
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
})