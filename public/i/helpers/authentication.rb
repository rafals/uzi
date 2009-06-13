helpers do
  def login_required
    unless logged_in?
      return 400, "niezalogowano"
    end
  end
  
  def login(login_or_email, password)
    if @current_user = User.authenticate(login_or_email, password)
      session[:user] = @current_user.id
      response.set_cookie('login_or_email', login_or_email)
      response.set_cookie('password', password)
      @current_user
    else
      logout
    end
  end
  
  def logout
    session[:user] = nil
    response.set_cookie('login_or_email', nil)
    response.set_cookie('password', nil)
    nil
  end
  
  def current_user
    @current_user ||= login_from_session || login_from_cookies
  end
  
  def logged_in?
    current_user
  end
  
  def login_from_session
    session[:user] ? User.first(:id => session[:user]) : nil
  end
  
  def login_from_cookies
    (login_or_email = request.cookies["login_or_email"] and password = request.cookies["password"]) ?
      login(login_or_email, password) : nil
  end
end