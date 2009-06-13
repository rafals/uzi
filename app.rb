require 'rubygems'
require 'sinatra'
require 'json'

get '/dashboard' do
  haml :dashboard
end

get '/' do
  haml :login
end

get '/signup' do
  haml :signup
end

get '/info' do
  haml :info
end

post '/login.json' do
  content_type :json, :charset => 'utf-8'
  if params[:password] == 'rav'
    {:id => 1,
     :friends => [{:name => 'Poskart', :firstname => 'Piotr', :surename => 'Poskart', :id => 2, :saldo => -50},
                  {:name => 'rav', :firstname => 'Rafał', :surename => 'Sobota', :id => 1, :saldo => -14},
                  {:name => 'jercik', :firstname => 'Łukasz', :surename => 'Jerciński', :id => 3, :saldo => 25}]
     }.to_json
  else
    halt 400
  end
end

post '/signup.json' do
  content_type :json, :charset => 'utf-8'
  if params[:password] == 'rav'
    {:id => 2, :friends => {}}.to_json
  else
    {:errors => {:email => 'ten email jest już używany', :login => 'ten login jest już zajęty'}}.to_json
  end
end

post '/add.json' do
  content_type :json, :charset => 'utf-8'
  {:id => 1,
   :friends => [{:name => 'Poskart', :firstname => 'Piotr', :surename => 'Poskart', :id => 2, :saldo => -50},
                {:name => 'rav', :firstname => 'Rafał', :surename => 'Sobota', :id => 1, :saldo => -14},
                {:name => 'jercik', :firstname => 'Łukasz', :surename => 'Jerciński', :id => 3, :saldo => 25},
                {:name => 'kraxi', :firstname => 'Maciek', :surename => 'Krakowiak', :id => 5, :saldo => 80}]
   }.to_json
end