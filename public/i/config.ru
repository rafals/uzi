#!/usr/bin/env ruby
require 'rubygems'
require 'compass'
require 'haml'
gem 'rack', '=0.9.1'
gem 'thin', '=1.0.0'
require 'sinatra/base'

class App < Sinatra::Base
  set :app_file, __FILE__
  set :root, File.dirname(__FILE__)
  set :server, 'thin'
  set :views, 'views'
  set :static, true
  set :public, File.dirname(__FILE__) + '/public'
  
  configure do
    Compass.configuration do |config|
      config.project_path = File.dirname(__FILE__)
      config.sass_dir = 'views'
      config.output_style = :compact
    end
  end
  
  get '/stylesheets/:name.css' do
    content_type 'text/css', :charset => 'utf-8'
    sass :"#{params[:name]}", :sass => Compass.sass_engine_options
  end

  get '/' do
    haml :index
  end
  
  get '/dashboard' do
    haml :dashboard
  end
  
  get '/dodaj_znajomego' do
    haml :znajomi
  end
end
 
if $0 =~ /spec$/
  require 'spec/interop/test'
  require 'sinatra/test'
  
  describe "App" do
    include Sinatra::Test
    before { @app = App }
    #it "should serve a greeting" do
    #  get '/'
    #  response.should be_ok
    #  response.body.should == "Hello, world"
    #end
    #
    #it "should serve content as text/plain" do
    #  get '/'
    #  response.headers['Content-Type'].should == 'text/plain'
    #end
  end
elsif system("spec " + __FILE__) && 0 == $?
  run App
else
  exit 1
end

