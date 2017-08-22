require 'sass'
 
module Sass::Script
  class Color
    def to_s(opts = {})
      return rgba_str.downcase if alpha?
      return smallest.downcase if options[:style] == :compressed
      #return COLOR_NAMES_REVERSE[rgb] if COLOR_NAMES_REVERSE[rgb]
      hex_str.downcase
    end

    def inspect
	  alpha? ? rgba_str.downcase : hex_str.downcase
	end
  end
end