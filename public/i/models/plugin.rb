class Plugin
  #include DataMapper::Resource
  #property :id, Serial, :key => true
  #property :name, String, :nullable => false, :unique => true
  #property :title, String, :nullable => false
  #property :created_at, DateTime
  #
  #belongs_to :section
  
  attr_accessor :name, :title, :section, :js, :css
  def initialize(name, options = {})
    @name = name.to_s
    @title = options[:title] || name.to_s.split('_').join(' ').capitalize
    @section = options[:section] || nil
    @icon = options[:icon] || nil # '/img/icons/' + @name + '.png'
    if options[:view]
      if options[:view] == :empty
        @view = :'defaults/empty'
      else
        @view = ('plugins/' + options[:view]).to_sym
      end
    else
      @view = options[:view] || ('plugins/' + @name).to_sym
    end
    @js = options[:js] || ('/js/plugins/' + @name + '.js')
    @css = options[:css] || ('/css/plugins/' + @name + '.css')
  end
  
  def root
    File.expand_path(File.dirname(__FILE__) + '/..')
  end
  
  def icon
    if @icon
      @icon
    elsif File.exists? root + '/public/img/icons/' + @name.to_s + '.png'
      '/img/icons/' + @name.to_s + '.png'
    else
      '/img/defaults/icon.png'
    end
  end
  
  def view
    if File.exists? root + '/views/' + @view.to_s + '.haml'
      @view
    else
      [:'defaults/default', {:plugin => self}]
    end
  end
  
end