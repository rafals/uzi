require 'rubygems'
require 'sinatra'
require 'json'

get '/' do
  haml :index
end

post '/login.json' do
  content_type :json, :charset => 'utf-8'
  if params[:password] == 'rav'
    {:nickname => 'Rafał Sobota', :friends => [{:name => 'kraxi', :id => 5, :saldo => 80}, {:name => 'poskart', :id => 2, :saldo => -50}]}.to_json
  else
    halt 400
  end
end

post '/signup.json' do
  content_type :json, :charset => 'utf-8'
  if params[:password] == 'rav'
    {:friends => {'kraxi' => {:id => 5, :saldo => 80}, 'poskart' => {:id => 2, :saldo => -50}}}.to_json
  else
    {:errors => {:email => 'ten email jest już zarejestrowany'}}.to_json
  end
end