require 'rubygems'
require 'sinatra'
require 'json'
require 'datamapper'

DataMapper.setup(:default, "mysql://root@localhost/uzi")
require 'models/user'
require 'models/plugin'
DataMapper.auto_upgrade!
require 'helpers/authentication'
require 'helpers/haml'
require 'helpers/dashboard'
require 'helpers/compress'

set :root, File.dirname(__FILE__)
set :compress, false

statsy = Plugin.new :statsy, :section => 'Znajomi'
dodaj_zaqpek = Plugin.new :dodaj_zaqpek, :section => 'Zaqpki'
pokaz_zaqpki = Plugin.new :pokaz_zaqpki, :section => 'Zaqpki'
dodaj_znajomego = Plugin.new :dodaj_znajomego, :section => 'Znajomi'
edytuj_profil = Plugin.new :edytuj_profil, :section => 'Profil'
wyloguj = Plugin.new :wyloguj, :view => :empty
skanuj_zebro = Plugin.new :skanuj_zebro, :title => 'Skanuj żebro', :section => 'Netke'
wyswietl_netke = Plugin.new :wyswietl_netke, :title => 'Wyświetl Netke', :section => 'Netke'

get '/' do
  if logged_in?
    @plugins = [statsy, pokaz_zaqpki, dodaj_zaqpek, dodaj_znajomego, edytuj_profil, wyloguj]
    @open = statsy
    @user = {:id => 1, :friends => [{:id => 1, :login => 'rav', :saldo => -40}, {:id => 2, :login => 'kraxi', :saldo => 10}, {:id => 3, :login => 'poskart', :saldo => 30}]}
    options.compress ? haml(:dashboard).compress_html : haml(:dashboard)
  else
    haml :login
  end
end

get '/wyloguj' do
  logout
  redirect '/login'
end

get '/login' do
  haml :login
end

post '/login' do
  if login(params[:login], params[:password])
    redirect '/'
  else
    haml :login
  end
end

post '/signup' do
  user = User.new :login => params[:login], :email => params[:email], :fullname => params[:fullname], :password => params[:password], :password_confirmation => params[:password_confirmation]
  if user.save
    login(params[:login], params[:password])
    redirect '/'
  else
    haml :login
  end
end