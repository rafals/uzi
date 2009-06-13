helpers do
  def include_css(file)
    url = file.to_s + '?' + rand(1000000).to_s
    haml '%link{ :rel => "stylesheet", :href => "' + url + '", :type => "text/css"}', :layout => false
  end
  def include_js(file)
    url = file.to_s + '?' + rand(1000000).to_s
    haml '%script{ :type => "text/javascript", :src => "' + url + '"}', :layout => false
  end
  def inject(*files)
    files.map do |file|
      path = options.root + '/public' + file
      if File.exist? path
        text = File.new(path).read
      else
        ""
      end
    end.join("\n")
  end
  def inject_js(*files)
    options.compress ? inject(*files).compress_js : inject(*files)
  end
  def inject_css(*files)
    options.compress ? inject(*files).compress_css : inject(*files)
  end
  
  def partial(name, locals = {})
    if name.respond_to? :each
      haml name[0], :locals => name[1] || nil
    else
      haml name, :layout => false, :locals => locals
    end
  end
end