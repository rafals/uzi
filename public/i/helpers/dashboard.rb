helpers do
  def dashboard_menu_open_section(plugins, open)
    schema = dashboard_menu_schema(plugins)
    schema.each_with_index do |element, i|
      if element[0] == open
        return i
      elsif element.length > 1 and element[1].respond_to? :each
        element[1].each do |e|
          return i if e == open
        end
      end
    end
    return -1
  end
  
  def dashboard_menu_schema(plugins)
    plugins = plugins.clone
    sections = {}
    plugins.each do |plugin|
      if s = plugin.section
        if sections[s]
          sections[s] += 1
        else
          sections[s] = 1
        end
      end
    end
    menu_sections = []
    sections.each_key do |k|
      menu_sections << k if sections[k] > 1
    end
    schema = []
    while (plugins.length > 0)
      plugin = plugins[0]
      if plugin.section and in_section = plugins.find_all{|p| p.section and p.section == plugin.section } and in_section.length > 1
        schema << [plugin, in_section]
        in_section.each{|p| plugins.delete p}
      else
        schema << [plugin]
        plugins.shift
      end
    end
    schema
  end
  
  def dashboard_menu(plugins)
    partial :"dashboard/menu", :schema => dashboard_menu_schema(plugins)
  end
end