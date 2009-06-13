class String
  def compress
    to_s.
    gsub(/\t+/, " ").
    gsub(/ +/, " ").
    gsub(/ +\n+/, "\n").
    gsub(/\n+ +/, "\n").
    gsub(/\n+/, "\n")
  end
  def compress_html
    to_s.
    compress.
    gsub(/>\n+/, ">").
    gsub(/\n+</, "<").
    gsub(/> +</, "><").
    gsub(/\/\*[a-zA-ZąśćźżęłóńĄŻŹĆŃŁÓŚ ,.\?!:\$\n]*\*\//, "").
    gsub(/\/\/[a-zA-ZąśćźżęłóńĄŻŹĆŃŁÓŚ ,.\?!:\$]*\n/, "").
    gsub(/\{\n+/, "{").
    gsub(/\}\n+/, "}").
    gsub(/\)\n+/, ");").
    gsub(/;\n+/, ";").
    gsub(/,\n+/, ",").
    gsub(/; +\n+/, ";").
    gsub(/\n/, ";")
  end
  def compress_js
    to_s.
    compress.
    gsub(/;\n+/, ";").
    gsub(/\{\n+/, "{").
    gsub(/\}\n+/, "}").
    gsub(/\)\n+/, ");").
    gsub(/,\n+/, ",")
  end
  def compress_css
    to_s.
    compress.
    gsub(/;\n+/, ";").
    gsub(/\{\n+/, "{").
    gsub(/\}\n+/, "}").
    gsub(/,\n+/, ",")
  end
end