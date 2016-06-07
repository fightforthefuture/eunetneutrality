module Jekyll
  module CurrencyFilter
    def money(value, delimiter=",")
      begin
        orig = value.to_s
        delimiter = delimiter.to_s
      rescue Exception => e
        puts "#{e.class} #{e}"
        return value
      end

      copy = orig.strip
      copy = copy.gsub(/^(-?\d+)(\d{3})/, "\\1#{delimiter}\\2")
      orig == copy ? copy : money(copy, delimiter)
      "$#{copy}"
    end
  end
end
Liquid::Template.register_filter(Jekyll::CurrencyFilter)

