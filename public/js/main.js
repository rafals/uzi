jQuery(function() {
  var lf = jQuery("#loginForm")
  var sf = jQuery("#signupForm")
  var dash = jQuery('#dashboard')
  var prof = jQuery('#profile')
  var frie = jQuery('#friends')
  var add = jQuery('#add')
  var addf = jQuery('#addForm')
  var current_user = {}
  
  add.click(function() {
    addf.show()
    add.hide()
  })
  
  login = function(data) {
    current_user = data
    // profile
    prof.html('zalogowano jako <a href="#" id="showProfile">' + current_user.nickname + '</a> - <a href="#" id="logout">wyloguj</a>')
    jQuery('#logout').click(function() {
      logout()
    })
    prof.show()
    // dashboard
    var friends = current_user.friends
    
    for (var friend in friends) {
      var f = jQuery('<div class="friend"><span class="friendName">' + friends[friend].name + '</span><span class="friendSaldo">' + friends[friend].saldo  + '</span></div>')
      frie.append(f)
    }
    
    
    dash.show()
  }
  
  logout = function() {
    frie.html('')
    prof.hide()
    dash.hide()
    lf.show()
  }
  
  form_errors = function(form, errors) {
    for (var e in errors){
      var input = form.children().children('input[name=' + e + ']')
      if(input) {
        var error = jQuery('<div class="fieldError">' + errors[e] + '</div>');
        input.after(error).change(function(){error.remove()});
      }
    }
  }
  
  sf.hide()
  loader = jQuery(".loader")
  loader.hide()

  
  jQuery("#showLoginForm").click(function() {
    sf.hide()
    lf.show()
  })
  jQuery("#showSignupForm").click(function() {
    lf.hide()
    sf.show()
  })
  
  jQuery().ajaxStart(function() {
    loader.show();
  }).ajaxStop(function() {
    loader.hide();
  })
  
  lf.validate({
    submitHandler: function(form) {
      jQuery(form).ajaxSubmit({
        url: "/login.json",
        dataType: "json",
        type: "POST",
        success: function(response) {
          lf.hide();
          login(response);
        },
        error: function(response) {
          lf.effect("shake", { times:2 }, 100);
        }
      })
    },
    rules: {
      password: {
        required: true
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      password: {
        required: "Podaj hasło"
      },
      email: "Podaj poprawny adres email"
    }
  });
  
  sf.validate({
    submitHandler: function(form) {
      jQuery(form).ajaxSubmit({
        url: "/signup.json",
        dataType: "json",
        type: "POST",
        success: function(response) {
          if (response.errors) {
            form_errors(sf, response.errors)
          } else {
            sf.hide();
            login(response);
          }
        }
      })
    },
    rules: {
      password: {
        required: true
      },
      confirm_password: {
        required: true,
        equalTo: "#spassword"
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      password: {
        required: "Podaj hasło"
      },
      confirm_password: {
        required: "Podaj hasło",
        equalTo: "Hasła muszą być jednakowe"
      },
      email: "Podaj poprawny adres email"
    }
  });
  jQuery("#spassword").blur(function() {
    jQuery("#spasswordc").valid();
  });
});