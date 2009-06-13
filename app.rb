require 'rubygems'
require 'sinatra'
require 'json'

helpers do
  def menu_li(text, id, ico_name)
    '<li><a id="' + id + '" href="#"><img class="icon" src="/i/icons/' + ico_name + '.png" alt="' + text + '"></img><span>' + text + '</span></a></li>'
  end
end

get '/dashboard' do
  haml :dashboard
end

#class Module
#  attr_accessor :id, :name, :section
#  def initialize(id, params = {})
#    @id = id.to_s
#    @name = params[:name] || id.to_s.split(" ").map{|e| e.capitalize}.join(' ')
#    @section = params[:section]
#  end
#end



get '/' do
  #statsy = Module.new :statsy
  #dodaj_zaqpek = Module.new :dodaj_zaqpek, :name => 'Dodaj zaqpek'
  #@modules = [statsy, dodaj_zaqpek]
  @user = {:id => 1, :friends => [{:id => 1, :name => 'Rav', :saldo => 50}, {:id => 2, :name => 'Poskart', :saldo => -20}, {:id => 3, :name => 'Krax', :saldo => -30}]}
  haml :dashboard
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